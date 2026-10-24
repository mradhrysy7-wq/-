import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ARTICLES } from '../data/articles';
import { HeroArt, RitualArt, CardArt } from './ArtIllustrations';

interface HomeViewProps {
  onNavigate: (page: PageId, section?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [isRitualDone, setIsRitualDone] = useState<boolean>(false);
  const [ritualMessage, setRitualMessage] = useState<string>(
    'يتذكر الموقع اختيارك على هذا الجهاز فقط.'
  );

  const key = 'ala-mahal-daily-ritual';
  const today = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === today) {
        setIsRitualDone(true);
      }
    } catch {
      /* ignore */
    }
  }, [today]);

  const toggleRitual = () => {
    const nextState = !isRitualDone;
    setIsRitualDone(nextState);
    try {
      if (nextState) {
        localStorage.setItem(key, today);
        setRitualMessage('جميل. اختيارك محفوظ على هذا الجهاز.');
      } else {
        localStorage.removeItem(key);
        setRitualMessage('أزلنا علامة الإنجاز لهذا اليوم.');
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <main id="app-main">
      {/* Hero */}
      <section className="hero container">
        <div className="hero-copy">
          <div className="kicker">
            <span className="kicker-line"></span> مساحة صغيرة ليوم أهدأ
          </div>
          <h1>
            مو لازم تغيّر
            <br />
            كل شيء <em>اليوم.</em>
          </h1>
          <p>
            أفكار بسيطة لتنظيم يومك وبيتك، من دون ضغط الكمال. اختر خطوة صغيرة تناسبك، وخذها على مَهَل.
          </p>
          <div className="hero-actions">
            <a
              className="button button-dark"
              href="#articles"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'articles');
              }}
            >
              تصفّح الأفكار <span>↙</span>
            </a>
            <a
              className="quiet-link"
              href="#ritual"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'ritual');
              }}
            >
              جرّب عادة اليوم <span>↓</span>
            </a>
          </div>
          <div className="hero-meta">
            <span className="meta-star">✳</span>
            <span>قراءة خفيفة، وأفكار قابلة للتطبيق.</span>
          </div>
        </div>
        <HeroArt />
        <div className="hero-side-label">
          ملاحظات صغيرة <span>—</span> أثر طويل
        </div>
      </section>

      {/* Ticker */}
      <section className="ticker">
        <div className="ticker-inner">
          <span>الهدوء عادة</span>
          <b>✳</b>
          <span>خطوة واحدة تكفي</span>
          <b>✳</b>
          <span>اترك مساحة لنفسك</span>
          <b>✳</b>
          <span>الهدوء عادة</span>
          <b>✳</b>
          <span>خطوة واحدة تكفي</span>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles container" id="articles">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              من دفترنا <span>01 / 09</span>
            </div>
            <h2>
              أفكار تنفع <em>اليوم.</em>
            </h2>
          </div>
          <p>دليل قصير وواضح. خذ منه ما يناسبك واترك الباقي.</p>
        </div>

        <div className="article-grid">
          {ARTICLES.map((article) => (
            <a
              key={article.id}
              className={`article-card ${article.cardColor}`}
              href={`#view=${article.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(article.id);
              }}
            >
              <CardArt type={article.artType} tag={article.tag} />
              <div className="card-body">
                <div className="card-meta">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.lead}</p>
                <span className="read-more">
                  اقرأ المقال <b>←</b>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Daily Ritual */}
      <section className="ritual container" id="ritual">
        <div className="ritual-content">
          <div className="eyebrow">
            لحظة على مَهَل <span>02 / 03</span>
          </div>
          <h2>
            عادة اليوم:
            <br />
            <em>رتّب زاوية واحدة.</em>
          </h2>
          <p>
            اختر مكانًا صغيرًا يمر عليك كثيرًا — طرف المكتب أو مدخل البيت — وأعد كل شيء فيه لمكانه. لا تتجاوز خمس دقائق.
          </p>
          <button
            className={`check-button ${isRitualDone ? 'is-done' : ''}`}
            type="button"
            onClick={toggleRitual}
            aria-pressed={isRitualDone}
          >
            <span className="check-circle">✓</span>
            <span>{isRitualDone ? 'أنجزتها اليوم ✓' : 'أنجزتها اليوم'}</span>
          </button>
          <span className="local-note">{ritualMessage}</span>
        </div>
        <RitualArt />
      </section>

      {/* Newsletter / Note */}
      <section className="newsletter container">
        <div className="newsletter-mark">مَ</div>
        <div>
          <div className="eyebrow">رسالة قصيرة، بلا إزعاج</div>
          <h2>خذ فكرة صغيرة معك.</h2>
          <p>ما فيه تسجيل أو بريد إلكتروني — فقط احفظ الموقع وارجع متى ما احتجت.</p>
        </div>
        <a
          className="button button-light"
          href="#articles"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home', 'articles');
          }}
        >
          تصفّح المقالات <span>↙</span>
        </a>
      </section>
    </main>
  );
};
