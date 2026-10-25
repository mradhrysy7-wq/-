import React from 'react';

export const HeroArt: React.FC = () => (
  <div className="hero-art" aria-label="رسم تجريدي لشمس ونبات وأكواب على طاولة">
    <div className="art-sun"></div>
    <div className="art-window">
      <div className="window-cross"></div>
    </div>
    <div className="art-table"></div>
    <div className="art-plant">
      <i></i>
      <i></i>
      <i></i>
      <b></b>
    </div>
    <div className="art-vase"></div>
    <div className="art-cup">
      <i></i>
    </div>
    <div className="art-book book-one"></div>
    <div className="art-book book-two"></div>
    <div className="art-caption">
      <span>ملاحظة اليوم</span>
      <b>ابدأ بما تقدر عليه.</b>
      <span className="caption-star">✳</span>
    </div>
  </div>
);

export const RitualArt: React.FC = () => (
  <div className="ritual-visual">
    <div className="ritual-art">
      <div className="ritual-disc"></div>
      <div className="ritual-shelf shelf-one">
        <i></i>
        <b></b>
        <span></span>
      </div>
      <div className="ritual-shelf shelf-two">
        <i></i>
        <b></b>
      </div>
      <div className="ritual-vase">
        <i></i>
        <i></i>
      </div>
      <div className="ritual-sun">✳</div>
    </div>
    <p className="ritual-quote">«الترتيب الصغير يفسح مجالًا للتنفس.»</p>
  </div>
);

interface CardArtProps {
  type: string;
  tag: string;
}

export const CardArt: React.FC<CardArtProps> = ({ type, tag }) => {
  switch (type) {
    case 'evening':
      return (
        <div className="card-art evening-art">
          <div className="lamp"></div>
          <div className="lamp-glow"></div>
          <div className="table-shape"></div>
          <div className="mug-shape"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'desk':
      return (
        <div className="card-art desk-art">
          <div className="desk-paper"></div>
          <div className="desk-pencil"></div>
          <div className="desk-sun"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'week':
      return (
        <div className="card-art week-art">
          <div className="week-note note-a">هذا الأسبوع</div>
          <div className="week-note note-b">وقت لنفسي</div>
          <div className="week-flower">✳</div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'morning':
      return (
        <div className="card-art morning-art">
          <div className="morning-window"></div>
          <div className="morning-sun"></div>
          <div className="morning-cup"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'entry':
      return (
        <div className="card-art entry-art">
          <div className="entry-door"></div>
          <div className="entry-hook"></div>
          <div className="entry-bag"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'pause':
      return (
        <div className="card-art pause-art">
          <div className="pause-page">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="pause-cup"></div>
          <div className="pause-flower">✳</div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'drawer':
      return (
        <div className="card-art drawer-art">
          <div className="drawer-box"></div>
          <div className="drawer-items"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'grocery':
      return (
        <div className="card-art grocery-art">
          <div className="grocery-bag"></div>
          <div className="grocery-fruit fruit-one"></div>
          <div className="grocery-fruit fruit-two"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'digital':
      return (
        <div className="card-art digital-art">
          <div className="digital-phone">
            <i></i>
            <i></i>
            <i></i>
            <b></b>
          </div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'wardrobe':
      return (
        <div className="card-art wardrobe-art">
          <div className="wardrobe-rod"></div>
          <div className="wardrobe-hanger h1"></div>
          <div className="wardrobe-hanger h2"></div>
          <div className="wardrobe-cloth"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'mind':
      return (
        <div className="card-art mind-art">
          <div className="mind-paper">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="mind-leaf l1">🍃</div>
          <div className="mind-leaf l2">✳</div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'evening-screen':
      return (
        <div className="card-art screen-art">
          <div className="night-moon"></div>
          <div className="night-table"></div>
          <div className="night-phone"></div>
          <div className="night-lamp"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'sayno':
      return (
        <div className="card-art sayno-art">
          <div className="sayno-sun"></div>
          <div className="sayno-envelope"></div>
          <div className="sayno-plant">🌿</div>
          <span className="art-label">{tag}</span>
        </div>
      );
    case 'morning-coffee':
      return (
        <div className="card-art coffee-art">
          <div className="coffee-sun"></div>
          <div className="coffee-steam"></div>
          <div className="coffee-mug"></div>
          <div className="coffee-coaster"></div>
          <span className="art-label">{tag}</span>
        </div>
      );
    default:
      return null;
  }
};

export const CoverArt: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'evening':
      return (
        <div className="article-cover cover-evening">
          <div className="lamp"></div>
          <div className="lamp-glow"></div>
          <div className="table-shape"></div>
          <div className="mug-shape"></div>
        </div>
      );
    case 'desk':
      return (
        <div className="article-cover cover-desk">
          <div className="desk-paper"></div>
          <div className="desk-pencil"></div>
          <div className="desk-sun"></div>
        </div>
      );
    case 'week':
      return (
        <div className="article-cover cover-week">
          <div className="week-note note-a">هذا الأسبوع</div>
          <div className="week-note note-b">وقت لنفسي</div>
          <div className="week-flower">✳</div>
        </div>
      );
    case 'morning':
      return (
        <div className="article-cover cover-morning">
          <div className="morning-window"></div>
          <div className="morning-sun"></div>
          <div className="morning-cup"></div>
        </div>
      );
    case 'entry':
      return (
        <div className="article-cover cover-entry">
          <div className="entry-door"></div>
          <div className="entry-hook"></div>
          <div className="entry-bag"></div>
        </div>
      );
    case 'pause':
      return (
        <div className="article-cover cover-pause">
          <div className="pause-page">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="pause-cup"></div>
          <div className="pause-flower">✳</div>
        </div>
      );
    case 'drawer':
      return (
        <div className="article-cover cover-drawer">
          <div className="drawer-box"></div>
          <div className="drawer-items"></div>
        </div>
      );
    case 'grocery':
      return (
        <div className="article-cover cover-grocery">
          <div className="grocery-bag"></div>
          <div className="grocery-fruit fruit-one"></div>
          <div className="grocery-fruit fruit-two"></div>
        </div>
      );
    case 'digital':
      return (
        <div className="article-cover cover-digital">
          <div className="digital-phone">
            <i></i>
            <i></i>
            <i></i>
            <b></b>
          </div>
        </div>
      );
    case 'wardrobe':
      return (
        <div className="article-cover cover-wardrobe">
          <div className="wardrobe-rod"></div>
          <div className="wardrobe-hanger h1"></div>
          <div className="wardrobe-hanger h2"></div>
          <div className="wardrobe-cloth"></div>
        </div>
      );
    case 'mind':
      return (
        <div className="article-cover cover-mind">
          <div className="mind-paper">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="mind-leaf l1">🍃</div>
          <div className="mind-leaf l2">✳</div>
        </div>
      );
    case 'evening-screen':
      return (
        <div className="article-cover cover-evening-screen">
          <div className="night-moon"></div>
          <div className="night-table"></div>
          <div className="night-phone"></div>
          <div className="night-lamp"></div>
        </div>
      );
    case 'sayno':
      return (
        <div className="article-cover cover-sayno">
          <div className="sayno-sun"></div>
          <div className="sayno-envelope"></div>
          <div className="sayno-plant">🌿</div>
        </div>
      );
    case 'morning-coffee':
      return (
        <div className="article-cover cover-morning-coffee">
          <div className="coffee-sun"></div>
          <div className="coffee-steam"></div>
          <div className="coffee-mug"></div>
          <div className="coffee-coaster"></div>
        </div>
      );
    default:
      return null;
  }
};
