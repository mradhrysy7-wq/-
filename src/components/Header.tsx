import React, { useState } from 'react';
import { PageId, ThemeMode } from '../types';
import { AmbientPlayer } from './AmbientPlayer';

interface HeaderProps {
  currentPage: PageId;
  theme: ThemeMode;
  onNavigate: (page: PageId, section?: string) => void;
  onToggleTheme: () => void;
  onOpenTimer: () => void;
  onOpenBreathe: () => void;
  onOpenPlanner: () => void;
  savedCount: number;
  onShowSaved: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  theme,
  onNavigate,
  onToggleTheme,
  onOpenTimer,
  onOpenBreathe,
  onOpenPlanner,
  savedCount,
  onShowSaved,
}) => {
  const [toolsOpen, setToolsOpen] = useState(false);

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

          {/* Calming Tools Menu */}
          <div className="nav-dropdown-wrap">
            <button
              type="button"
              className="nav-dropdown-trigger"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              أدوات الهدوء ▾
            </button>
            {toolsOpen && (
              <div className="nav-dropdown-menu" onClick={() => setToolsOpen(false)}>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    onOpenTimer();
                  }}
                >
                  ⏱ مؤقت الـ 5 دقائق
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    onOpenBreathe();
                  }}
                >
                  🌿 لحظة تنفّس
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    onOpenPlanner();
                  }}
                >
                  📝 خطة الأسبوع (٣ أسئلة)
                </button>
              </div>
            )}
          </div>

          {savedCount > 0 && (
            <button
              type="button"
              className="saved-nav-btn"
              onClick={onShowSaved}
              title="المقالات المحفوظة"
            >
              المحفوظات ({savedCount})
            </button>
          )}

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

        <div className="header-actions">
          {/* Ambient Sound Widget */}
          <AmbientPlayer />

          {/* Theme Toggle */}
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
      </div>
    </header>
  );
};
