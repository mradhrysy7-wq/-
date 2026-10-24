import React, { useState, useEffect } from 'react';
import { PageId, ThemeMode } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ArticleView } from './components/ArticleView';
import { InfoView } from './components/InfoView';
import { PAGE_TITLES } from './data/articles';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('ala-mahal-theme');
      return stored === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('ala-mahal-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Route parser
  const parseRoute = () => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      setCurrentPage('home');
      return;
    }

    if (hash === 'articles' || hash === 'ritual') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    const params = new URLSearchParams(hash);
    const view = params.get('view') as PageId | null;
    const section = params.get('section');

    if (view && PAGE_TITLES[view]) {
      setCurrentPage(view);
      if (section) {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      setCurrentPage('home');
    }
  };

  useEffect(() => {
    parseRoute();
    window.addEventListener('popstate', parseRoute);
    window.addEventListener('hashchange', parseRoute);
    return () => {
      window.removeEventListener('popstate', parseRoute);
      window.removeEventListener('hashchange', parseRoute);
    };
  }, []);

  // Update page title
  useEffect(() => {
    const title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
    document.title = title;
  }, [currentPage]);

  const navigateTo = (page: PageId, section?: string) => {
    setCurrentPage(page);
    const hash = `#view=${page}${section ? `&section=${encodeURIComponent(section)}` : ''}`;
    window.history.pushState({ page, section }, '', hash);

    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    if (currentPage === 'home') {
      return <HomeView onNavigate={navigateTo} />;
    }

    if (['about', 'privacy', 'contact'].includes(currentPage)) {
      return <InfoView pageId={currentPage} onNavigate={navigateTo} />;
    }

    return <ArticleView articleId={currentPage} onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        theme={theme}
        onNavigate={navigateTo}
        onToggleTheme={toggleTheme}
      />
      {renderContent()}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
