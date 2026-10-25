import React, { useState } from 'react';
import { sounds } from '../utils/audio';

export const AmbientPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState<'rain' | 'waves' | 'breeze' | null>(null);

  const toggleSound = (type: 'rain' | 'waves' | 'breeze') => {
    if (activeSound === type) {
      sounds.stopAmbient();
      setActiveSound(null);
    } else {
      sounds.startAmbient(type);
      setActiveSound(type);
    }
  };

  const stop = () => {
    sounds.stopAmbient();
    setActiveSound(null);
    setIsOpen(false);
  };

  return (
    <div className="ambient-widget">
      <button
        type="button"
        className={`ambient-trigger ${activeSound ? 'is-playing' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="أصوات طبيعية هادئة للتركيز والقراءة"
        aria-label="أصوات طبيعية هادئة للتركيز والقراءة"
      >
        <span className="ambient-icon">{activeSound ? '♬' : '♫'}</span>
        <span className="ambient-text">
          {activeSound === 'rain'
            ? 'مطر خفيف'
            : activeSound === 'breeze'
            ? 'نسيم هادئ'
            : activeSound === 'waves'
            ? 'أمواج ناعمة'
            : 'أجواء هادئة'}
        </span>
      </button>

      {isOpen && (
        <div className="ambient-dropdown">
          <div className="ambient-header">
            <span>أجواء صوتية للقراءة والترتيب</span>
            {activeSound && (
              <button type="button" onClick={stop} className="ambient-stop-btn">
                إيقاف ✕
              </button>
            )}
          </div>
          <div className="ambient-options">
            <button
              type="button"
              className={`ambient-opt ${activeSound === 'rain' ? 'active' : ''}`}
              onClick={() => toggleSound('rain')}
            >
              🌧 مطر خفيف
            </button>
            <button
              type="button"
              className={`ambient-opt ${activeSound === 'breeze' ? 'active' : ''}`}
              onClick={() => toggleSound('breeze')}
            >
              🍃 نسيم هادئ
            </button>
            <button
              type="button"
              className={`ambient-opt ${activeSound === 'waves' ? 'active' : ''}`}
              onClick={() => toggleSound('waves')}
            >
              🌊 أمواج ناعمة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
