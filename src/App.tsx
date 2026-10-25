import React, { useState, useEffect } from 'react';
import { PageId, ThemeMode } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ArticleView } from './components/ArticleView';
import { InfoView } from './components/InfoView';
import { CalmTimerModal } from './components/CalmTimerModal';
import { BreatheModal } from './components/BreatheModal';
import { WeeklyPlannerModal } from './components/WeeklyPlannerModal';
import { PAGE_TITLES } from './data/articles';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  // Modals state
  const [timerOpen, setTimerOpen] = useState<boolean>(false);
  const [breatheOpen, setBreatheOpen] = useState<boolean>(false);
  const [plannerOpen, setPlannerOpen] = useState<boolean>(false);

  // Bookmarked articles state
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ala-mahal-bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveArticle = (id: string) => {
    setSavedArticles((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('ala-mahal-bookmarks', JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

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

  const showSavedArticles = () => {
    setActiveCategory('المحفوظات ★');
    navigateTo('home', 'articles');
  };

  const renderContent = () => {
    if (currentPage === 'home') {
      return (
        <HomeView
          onNavigate={navigateTo}
          onOpenTimer={() => setTimerOpen(true)}
          onOpenBreathe={() => setBreatheOpen(true)}
          onOpenPlanner={() => setPlannerOpen(true)}
          savedArticles={savedArticles}
          onToggleSave={toggleSaveArticle}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      );
    }

    if (['about', 'privacy', 'contact'].includes(currentPage)) {
      return <InfoView pageId={currentPage} onNavigate={navigateTo} />;
    }

    return (
      <ArticleView
        articleId={currentPage}
        onNavigate={navigateTo}
        isSaved={savedArticles.includes(currentPage)}
        onToggleSave={toggleSaveArticle}
        onOpenTimer={() => setTimerOpen(true)}
        onOpenBreathe={() => setBreatheOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        theme={theme}
        onNavigate={navigateTo}
        onToggleTheme={toggleTheme}
        onOpenTimer={() => setTimerOpen(true)}
        onOpenBreathe={() => setBreatheOpen(true)}
        onOpenPlanner={() => setPlannerOpen(true)}
        savedCount={savedArticles.length}
        onShowSaved={showSavedArticles}
      />

      {renderContent()}

      <Footer onNavigate={navigateTo} />

      {/* Calming Modals */}
      <CalmTimerModal isOpen={timerOpen} onClose={() => setTimerOpen(false)} />
      <BreatheModal isOpen={breatheOpen} onClose={() => setBreatheOpen(false)} />
      <WeeklyPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
    </div>
  );
};

export default App;
