import React from 'react';
import { PageId } from '../types';
import { INFO_PAGES } from '../data/infoPages';

interface InfoViewProps {
  pageId: PageId;
  onNavigate: (page: PageId) => void;
}

export const InfoView: React.FC<InfoViewProps> = ({ pageId, onNavigate }) => {
  const page = INFO_PAGES[pageId];

  if (!page) {
    return (
      <main className="info-main container">
        <h1>الصفحة غير موجودة</h1>
        <p>عذرًا، لم نتمكن من العثور على الصفحة المطلوبة.</p>
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

  return (
    <main className="info-main container" id="app-main">
      <a
        className="back-link"
        href="#view=home"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('home');
        }}
      >
        ← الرئيسية
      </a>
      <div className="eyebrow" style={{ marginTop: '32px' }}>
        {page.eyebrow}
      </div>
      <h1>{page.title}</h1>
      {page.content}
    </main>
  );
};
