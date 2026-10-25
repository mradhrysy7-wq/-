import React, { useState } from 'react';
import { PageId } from '../types';
import { ARTICLES, ARTICLE_CONTENTS } from '../data/articles';
import { CoverArt } from './ArtIllustrations';

interface ArticleViewProps {
  articleId: PageId;
  onNavigate: (page: PageId, section?: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenTimer: () => void;
  onOpenBreathe: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  articleId,
  onNavigate,
  isSaved,
  onToggleSave,
  onOpenTimer,
  onOpenBreathe,
}) => {
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0); // -2, 0, +2, +4
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const article = ARTICLES.find((a) => a.id === articleId);

  if (!article) {
    return (
      <main className="info-main container">
        <h1>المقال غير موجود</h1>
        <p>عذرًا، لم نتمكن من العثور على المقال المطلوب.</p>
        <a
          href="#view=home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          ← العودة إلى الرئيسية
        </a>
      </main>
    );
  }

  const content = ARTICLE_CONTENTS[articleId];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId?: string) => {
    e.preventDefault();
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const increaseFont = () => {
    if (fontSizeOffset < 4) setFontSizeOffset((prev) => prev + 2);
  };

  const decreaseFont = () => {
    if (fontSizeOffset > -2) setFontSizeOffset((prev) => prev - 2);
  };

  const isNightTopic =
    articleId === 'evening' ||
    articleId === 'evening-screen' ||
    articleId === 'mind' ||
    articleId === 'pause';

  return (
    <main className={`article-page ${focusMode ? 'is-focus-mode' : ''}`} id="app-main">
      <section className="article-hero container">
        <div className="article-top-bar">
          <a
            className="back-link"
            href="#articles"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home', 'articles');
            }}
          >
            ← العودة إلى المقالات
          </a>

          {/* Reading & Utility Controls */}
          <div className="reading-toolbar">
            <button
              type="button"
              className={`reader-ctrl-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => onToggleSave(article.id)}
              title={isSaved ? 'المقال محفوظ في دفترك' : 'حفظ المقال في دفتر القراءة'}
            >
              <span>{isSaved ? '★ محفوظ' : '☆ حفظ'}</span>
            </button>

            <div className="font-size-group">
              <button
                type="button"
                className="reader-ctrl-btn"
                onClick={decreaseFont}
                title="تصغير حجم الخط"
                disabled={fontSizeOffset <= -2}
              >
                A-
              </button>
              <button
                type="button"
                className="reader-ctrl-btn"
                onClick={increaseFont}
                title="تكبير حجم الخط"
                disabled={fontSizeOffset >= 4}
              >
                A+
              </button>
            </div>

            <button
              type="button"
              className={`reader-ctrl-btn ${focusMode ? 'active' : ''}`}
              onClick={() => setFocusMode(!focusMode)}
              title="وضع القراءة المركّز"
            >
              {focusMode ? 'عرض عادي' : 'وضع التركيز'}
            </button>
          </div>
        </div>

        <div className="eyebrow">
          {article.category} <span>{article.readTime}</span>
        </div>
        <h1>{article.title}</h1>
        <p>{article.lead}</p>
        <div className="article-byline">مقالات على مهل · {article.date}</div>
      </section>

      <CoverArt type={article.artType} />

      <div className="article-layout">
        <article
          className="article-body"
          style={{ fontSize: `calc(14px + ${fontSizeOffset}px)` }}
        >
          {content}

          {/* Bedtime Breathing Advice Prompt */}
          {isNightTopic && (
            <div className="bedtime-breathe-tip">
              <div className="bedtime-tip-icon">🌙</div>
              <div className="bedtime-tip-body">
                <strong>نصيحة قبل النوم: خذ دقيقة تنفّس</strong>
                <p>
                  قبل أن تغمض عينيك، امنح جسمك دقيقة واحدة من الشهيق والزفير الهادئ لتهدئة ضربات القلب وإفساح المجال لنوم عميق.
                </p>
              </div>
              <button
                type="button"
                className="button button-dark bedtime-btn"
                onClick={onOpenBreathe}
              >
                شغّل لحظة تنفّس 🌿
              </button>
            </div>
          )}

          {/* Calming Action Strip at the bottom of the article */}
          <div className="article-bottom-action">
            <div className="action-text">
              <strong>تريد تطبيق الفكرة الآن؟</strong>
              <p>شغّل مؤقت الـ 5 دقائق وتوقف عندما يرن.</p>
            </div>
            <button type="button" className="button button-dark" onClick={onOpenTimer}>
              افتح مؤقت الخطوة ⏱
            </button>
          </div>
        </article>

        {!focusMode && (
          <aside className="article-aside">
            <strong>في هذا المقال</strong>
            {article.asideLinks.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.anchorId || ''}`}
                onClick={(e) => handleAnchorClick(e, link.anchorId)}
              >
                {link.text}
              </a>
            ))}
            {article.asideNote && <p>{article.asideNote}</p>}
          </aside>
        )}
      </div>
    </main>
  );
};
