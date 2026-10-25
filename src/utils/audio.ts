// Web Audio API pure synthesizer for serene sounds without external dependencies

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioNode | null = null;
  private currentAmbientType: 'rain' | 'waves' | 'breeze' | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Gentle singing bowl / chime bell for timer completion
  playGentleChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Base note + pleasant harmonics (e.g. 528Hz peaceful frequency)
      const freqs = [528, 1056, 1584];
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const initialGain = index === 0 ? 0.25 : 0.08 / (index + 1);
        gain.gain.setValueAtTime(initialGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.3);
      });
    } catch {
      // Audio not permitted or supported
    }
  }

  // Soft click / tap sound for interactions
  playSoftTap() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      /* ignore */
    }
  }

  // Generate soothing ambient soundscapes procedurally
  startAmbient(type: 'rain' | 'waves' | 'breeze') {
    this.stopAmbient();
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink-ish / Brown noise generator for warm relaxing natural sounds
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter settings depending on sound
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
      } else if (type === 'breeze') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
      } else if (type === 'waves') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.16, ctx.currentTime);

        // LFO for wave swelling
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second wave cycle
        lfoGain.gain.setValueAtTime(150, ctx.currentTime);
        lfo.connect(filter.frequency);
        lfo.start();
      }

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      this.ambientSource = whiteNoise;
      this.currentAmbientType = type;
    } catch {
      /* ignore */
    }
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        (this.ambientSource as AudioScheduledSourceNode).stop();
        this.ambientSource.disconnect();
      } catch {
        /* ignore */
      }
      this.ambientSource = null;
    }
    this.currentAmbientType = null;
  }

  getCurrentAmbient() {
    return this.currentAmbientType;
  }
}

export const sounds = new SoundManager();
