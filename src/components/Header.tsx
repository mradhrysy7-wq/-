import React from 'react';
import { PageId, ThemeMode } from '../types';

interface HeaderProps {
  currentPage: PageId;
  theme: ThemeMode;
  onNavigate: (page: PageId, section?: string) => void;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  theme,
  onNavigate,
  onToggleTheme,
}) => {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
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

        <nav className="main-nav" aria-label="التنقل الرئيسي">
          <a
            className={currentPage === 'home' ? 'current' : ''}
            href="#view=home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            الرئيسية
          </a>
          <a
            href="#articles"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home', 'articles');
            }}
          >
            المقالات
          </a>
          <a
            href="#ritual"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home', 'ritual');
            }}
          >
            عادة اليوم
          </a>
          <a
            className={currentPage === 'about' ? 'current' : ''}
            href="#view=about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
          >
            عن الموقع
          </a>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'تفعيل المظهر الفاتح' : 'تفعيل المظهر الداكن'}
          aria-label={theme === 'dark' ? 'تفعيل المظهر الفاتح' : 'تفعيل المظهر الداكن'}
          aria-pressed={theme === 'dark'}
        >
          <span className="theme-icon" aria-hidden="true">
            {theme === 'dark' ? '☀' : '◐'}
          </span>
          <span className="theme-label">{theme === 'dark' ? 'فاتح' : 'داكن'}</span>
        </button>

        <a
          className="nav-cta"
          href="#articles"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home', 'articles');
          }}
        >
          ابدأ من هنا <span>↙</span>
        </a>
      </div>
    </header>
  );
};
