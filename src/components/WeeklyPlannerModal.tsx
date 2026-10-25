import React, { useState, useEffect } from 'react';

interface WeeklyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyPlannerModal: React.FC<WeeklyPlannerModalProps> = ({ isOpen, onClose }) => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [copied, setCopied] = useState(false);

  const storageKey = 'ala-mahal-weekly-plan';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setQ1(parsed.q1 || '');
        setQ2(parsed.q2 || '');
        setQ3(parsed.q3 || '');
      }
    } catch {
      /* ignore */
    }
  }, []);

  const save = (newQ1: string, newQ2: string, newQ3: string) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ q1: newQ1, q2: newQ2, q3: newQ3 }));
    } catch {
      /* ignore */
    }
  };

  const handleCopy = () => {
    const text = `✳ خطة أسبوعي على مهل:\n\n1. الأولوية الأساسية:\n${q1 || '(لم تحدد)'}\n\n2. خطوة التسهيل الصغيرة:\n${q2 || '(لم تحدد)'}\n\n3. مساحة الراحة والوقت الحر:\n${q3 || '(لم تحدد)'}\n\n— كُتبت على مهل.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="eyebrow">
            تخطيط مرن <span>ثلاثة أسئلة فقط</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>

        <h3 className="modal-title">خطة الأسبوع الخفيفة</h3>
        <p className="modal-subtitle">
          لا تملأ جدولك بمهام مرهقة. حدد هذه الإجابات الثلاث، واجعل الأسبوع يخدمك بدل أن تخدم الجدول.
        </p>

        <div className="planner-form">
          <div className="planner-field">
            <label>١. ما أهم شيء يحتاج انتباهي؟ (مهمة أو اثنتان فقط)</label>
            <input
              type="text"
              placeholder="مثال: تسليم التقرير، أو مراجعة الطبيب..."
              value={q1}
              onChange={(e) => {
                setQ1(e.target.value);
                save(e.target.value, q2, q3);
              }}
            />
          </div>

          <div className="planner-field">
            <label>٢. ما الشيء الصغير الذي سيجعل الأسبوع أسهل؟</label>
            <input
              type="text"
              placeholder="مثال: تجهيز وجبات بسيطة، أو ترتيب الحقيبة..."
              value={q2}
              onChange={(e) => {
                setQ2(e.target.value);
                save(q1, e.target.value, q3);
              }}
            />
          </div>

          <div className="planner-field">
            <label>٣. أين أترك مساحة للراحة أو التغيير؟</label>
            <input
              type="text"
              placeholder="مثال: مساء الأربعاء بلا مواعيد، أو قراءة نصف ساعة..."
              value={q3}
              onChange={(e) => {
                setQ3(e.target.value);
                save(q1, q2, e.target.value);
              }}
            />
          </div>
        </div>

        <div className="modal-actions-row">
          <button type="button" className="button button-dark" onClick={handleCopy}>
            {copied ? 'تم نسخ الخطة بنجاح ✓' : 'نسخ الخطة للملاحظات 📋'}
          </button>
          <button type="button" className="quiet-link" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
