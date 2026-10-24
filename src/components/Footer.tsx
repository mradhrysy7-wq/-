import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <a
          className="logo"
          href="#view=home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <span className="logo-mark">مَ</span>
          <span>
            على <b>مَهَل</b>
          </span>
        </a>
        <p>أفكار صغيرة لحياة يومية أخف.</p>
        <nav aria-label="روابط الموقع">
          <a
            href="#view=about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
          >
            من نحن
          </a>
          <a
            href="#view=privacy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('privacy');
            }}
          >
            الخصوصية
          </a>
          <a
            href="#view=contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
          >
            تواصل
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 على مهل</span>
        <span>محتوى أصلي، كُتب ليُستخدم.</span>
      </div>
    </footer>
  );
};
