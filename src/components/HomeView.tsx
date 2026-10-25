import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ARTICLES } from '../data/articles';
import { HeroArt, RitualArt, CardArt } from './ArtIllustrations';

interface HomeViewProps {
  onNavigate: (page: PageId, section?: string) => void;
  onOpenTimer: () => void;
  onOpenBreathe: () => void;
  onOpenPlanner: () => void;
  savedArticles: string[];
  onToggleSave: (articleId: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const DAILY_REFLECTIONS = [
  '«الترتيب الصغير لا يغيّر بيتك فقط، بل يفسح مجالاً لذهنك ليتنفس.»',
  '«أجمل العادات هي التي تبدأ صغيرة جداً لدرجة أنه يستحيل التكاسل عنها.»',
  '«ليس الغرض أن تكون كل دقيقة منتجة، بل أن تعيش يومك بلا ركض لا داعي له.»',
  '«اترك مساحة فارغة في جدولك، فالراحة ليست مكافأة بل وقود لغد أهدأ.»',
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenTimer,
  onOpenBreathe,
  onOpenPlanner,
  savedArticles,
  onToggleSave,
  activeCategory,
  setActiveCategory,
}) => {
  const [isRitualDone, setIsRitualDone] = useState<boolean>(false);
  const [ritualMessage, setRitualMessage] = useState<string>(
    'يتذكر الموقع اختيارك على هذا الجهاز فقط.'
  );

  const key = 'ala-mahal-daily-ritual';
  const today = new Date().toLocaleDateString('en-CA');

  // Daily quote selection based on day of month
  const dayIndex = new Date().getDate() % DAILY_REFLECTIONS.length;
  const todayQuote = DAILY_REFLECTIONS[dayIndex];

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

  const categories = [
    'الكل',
    'ترتيب البيت',
    'مساحة العمل',
    'بداية اليوم',
    'تخطيط مرن',
    'إيقاع اليوم',
    'مساحة رقمية',
    'المحفوظات ★',
  ];

  const filteredArticles = ARTICLES.filter((article) => {
    if (activeCategory === 'الكل') return true;
    if (activeCategory === 'المحفوظات ★') return savedArticles.includes(article.id);
    if (activeCategory === 'ترتيب البيت') return article.category === 'ترتيب البيت' || article.category === 'زاوية صغيرة';
    if (activeCategory === 'مساحة العمل') return article.category === 'مساحة العمل';
    if (activeCategory === 'بداية اليوم') return article.category === 'روتين بسيط' || article.tag === 'بداية اليوم';
    if (activeCategory === 'تخطيط مرن') return article.category === 'تخطيط مرن' || article.category === 'تخطيط البيت';
    if (activeCategory === 'إيقاع اليوم') return article.category === 'إيقاع اليوم' || article.tag === 'روتين مسائي';
    if (activeCategory === 'مساحة رقمية') return article.tag === 'مساحة رقمية' || article.category === 'تنظيم بسيط';
    return true;
  });

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

      {/* Daily Reflection & Quick Calming Tools Strip */}
      <section className="calm-strip-section container">
        <div className="reflection-card">
          <div className="reflection-icon">✳</div>
          <div className="reflection-text">
            <small>تأمّل اليوم</small>
            <p>{todayQuote}</p>
          </div>
        </div>

        <div className="quick-tools-grid">
          <button type="button" className="quick-tool-btn" onClick={onOpenTimer}>
            <span className="tool-btn-icon">⏱</span>
            <div>
              <strong>مؤقت الـ 5 دقائق</strong>
              <small>ركز في خطوة واحدة دون تشتيت</small>
            </div>
          </button>

          <button type="button" className="quick-tool-btn" onClick={onOpenBreathe}>
            <span className="tool-btn-icon">🌿</span>
            <div>
              <strong>لحظة تنفّس</strong>
              <small>دقيقة لاستعادة الهدوء والتوازن</small>
            </div>
          </button>

          <button type="button" className="quick-tool-btn" onClick={onOpenPlanner}>
            <span className="tool-btn-icon">📝</span>
            <div>
              <strong>خطة الأسبوع</strong>
              <small>ثلاثة أسئلة مرنة لترتيب الأولويات</small>
            </div>
          </button>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles container" id="articles">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              من دفترنا <span>01 / 14</span>
            </div>
            <h2>
              أفكار تنفع <em>اليوم.</em>
            </h2>
          </div>
          <p>دليل قصير وواضح. خذ منه ما يناسبك واترك الباقي.</p>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((cat) => {
            const count = cat === 'المحفوظات ★' ? savedArticles.length : undefined;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} {count !== undefined && count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="empty-articles-note">
            <p>لا توجد مقالات محفوظة حالياً في هذا القسم.</p>
            <button
              type="button"
              className="button button-dark"
              onClick={() => setActiveCategory('الكل')}
            >
              عرض جميع المقالات
            </button>
          </div>
        ) : (
          <div className="article-grid">
            {filteredArticles.map((article) => {
              const isSaved = savedArticles.includes(article.id);
              return (
                <div key={article.id} className="article-card-wrapper">
                  <a
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

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    className={`bookmark-btn ${isSaved ? 'is-saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(article.id);
                    }}
                    title={isSaved ? 'إزالة من المحفوظات' : 'حفظ في دفتر القراءة'}
                    aria-label={isSaved ? 'إزالة من المحفوظات' : 'حفظ في دفتر القراءة'}
                  >
                    {isSaved ? '★' : '☆'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
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

      {/* Bedtime Advice Card */}
      <section className="bedtime-nudge-section container">
        <div className="bedtime-nudge-card">
          <div className="bedtime-nudge-content">
            <div className="eyebrow">
              نصيحة المساء <span>قبل النوم</span>
            </div>
            <h2>قبل ما تنام.. شغّل <em>لحظة تنفّس.</em></h2>
            <p>
              أغلق الشاشات وامنح عقلك دقيقة واحدة فقط من الشهيق والزفير الهادئ. تمرين بسيط يساعد جهازك العصبي على الاسترخاء والانتقال للنوم بسلام.
            </p>
            <button
              type="button"
              className="button button-dark"
              onClick={onOpenBreathe}
            >
              شغّل لحظة تنفّس الآن 🌿
            </button>
          </div>
          <div className="bedtime-nudge-art">
            <div className="bedtime-moon"></div>
            <div className="bedtime-star s1">✦</div>
            <div className="bedtime-star s2">✦</div>
            <div className="bedtime-star s3">✦</div>
          </div>
        </div>
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
