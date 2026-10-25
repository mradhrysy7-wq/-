import React, { useState, useEffect } from 'react';

interface BreatheModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = 'شهيق هادئ' | 'ثبات خفيف' | 'زفير بطيء' | 'راحة';

export const BreatheModal: React.FC<BreatheModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<Phase>('شهيق هادئ');
  const [counter, setCounter] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => {
            if (currentPhase === 'شهيق هادئ') return 'ثبات خفيف';
            if (currentPhase === 'ثبات خفيف') return 'زفير بطيء';
            if (currentPhase === 'زفير بطيء') return 'راحة';
            setCycles((c) => c + 1);
            return 'شهيق هادئ';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const isExpanding = phase === 'شهيق هادئ' || phase === 'ثبات خفيف';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card text-center" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="eyebrow">
            لحظة على مهل <span>تنفّس وتصفية ذهن</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>

        <h3 className="modal-title">دقيقة واحدة لاستعادة التوازن</h3>
        <p className="modal-subtitle">
          اترك الشاشة والمهام، خذ نفساً عميقاً بهدوء ودع جسدك يرتاح.
        </p>

        <div className="breathe-wrap">
          <div className={`breathe-circle ${isExpanding ? 'expand' : 'shrink'}`}>
            <div className="breathe-inner">
              <span className="breathe-phase">{phase}</span>
              <span className="breathe-count">{counter}</span>
            </div>
          </div>
        </div>

        <div className="breathe-footer">
          <span>أكملت {cycles} دورات تنفس مريحة</span>
          <button type="button" className="button button-dark" onClick={onClose} style={{ marginTop: '16px' }}>
            أنا مستعد الآن ↵
          </button>
        </div>
      </div>
    </div>
  );
};
