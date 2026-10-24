import React from 'react';
import { PageId } from '../types';
import { ARTICLES, ARTICLE_CONTENTS } from '../data/articles';
import { CoverArt } from './ArtIllustrations';

interface ArticleViewProps {
  articleId: PageId;
  onNavigate: (page: PageId, section?: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ articleId, onNavigate }) => {
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

  return (
    <main className="article-page" id="app-main">
      <section className="article-hero container">
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
        <div className="eyebrow">
          {article.category} <span>{article.readTime}</span>
        </div>
        <h1>{article.title}</h1>
        <p>{article.lead}</p>
        <div className="article-byline">مقالات على مهل · {article.date}</div>
      </section>

      <CoverArt type={article.artType} />

      <div className="article-layout">
        <article className="article-body">{content}</article>

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
      </div>
    </main>
  );
};
