import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';

interface CalmTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESETS = [
  { label: '٣ دقائق (استراحة)', minutes: 3 },
  { label: '٥ دقائق (ترتيب زاوية)', minutes: 5 },
  { label: '١٠ دقائق (إغلاق اليوم)', minutes: 10 },
  { label: '١٥ دقيقة (ترتيب مكتب)', minutes: 15 },
];

export const CalmTimerModal: React.FC<CalmTimerModalProps> = ({ isOpen, onClose }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setTimeLeft(selectedMinutes * 60);
    setIsRunning(false);
    setIsFinished(false);
  }, [selectedMinutes]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            sounds.playGentleChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const totalSecs = selectedMinutes * 60;
  const progressPercent = ((totalSecs - timeLeft) / totalSecs) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const handleStart = () => {
    sounds.playSoftTap();
    setIsRunning(true);
    setIsFinished(false);
  };

  const handlePause = () => {
    sounds.playSoftTap();
    setIsRunning(false);
  };

  const handleReset = () => {
    sounds.playSoftTap();
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(selectedMinutes * 60);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="eyebrow">
            أداة على مهل <span>مؤقت هادئ</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>

        <h3 className="modal-title">مؤقت الخطوة الصغيرة</h3>
        <p className="modal-subtitle">
          اختر وقتاً محدداً للبدء، وتوقف بمجرد انتهاء الوقت. الفكرة أن تحافظ على خفة العادة.
        </p>

        <div className="timer-presets">
          {PRESETS.map((p) => (
            <button
              key={p.minutes}
              type="button"
              className={`timer-preset-btn ${selectedMinutes === p.minutes ? 'active' : ''}`}
              onClick={() => setSelectedMinutes(p.minutes)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="timer-display-wrap">
          <div className="timer-circle">
            <svg viewBox="0 0 100 100" className="timer-svg">
              <circle cx="50" cy="50" r="44" className="timer-track" />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="timer-fill"
                style={{
                  strokeDasharray: 276.46,
                  strokeDashoffset: 276.46 - (276.46 * progressPercent) / 100,
                }}
              />
            </svg>
            <div className="timer-numbers">
              <span>{formattedTime}</span>
              <small>{isRunning ? 'مستمر بهدوء...' : isFinished ? 'انتهى الوقت ✓' : 'جاهز للبدء'}</small>
            </div>
          </div>
        </div>

        {isFinished && (
          <div className="timer-finish-note">
            ✳ خطوة ممتازة. توقف هنا حتى لو لم يكتمل كل شيء، استمتع بما أنجزته اليوم.
          </div>
        )}

        <div className="timer-actions">
          {!isRunning ? (
            <button type="button" className="button button-dark" onClick={handleStart}>
              {timeLeft < totalSecs && !isFinished ? 'استئناف' : 'ابدأ المؤقت ↵'}
            </button>
          ) : (
            <button type="button" className="button button-dark" onClick={handlePause}>
              إيقاف مؤقت ⏸
            </button>
          )}

          <button type="button" className="quiet-link" onClick={handleReset}>
            إعادة الضبط ↺
          </button>
        </div>
      </div>
    </div>
  );
};
