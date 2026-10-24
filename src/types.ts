export type PageId =
  | 'home'
  | 'evening'
  | 'desk'
  | 'weekly'
  | 'morning'
  | 'entry'
  | 'pause'
  | 'drawer'
  | 'grocery'
  | 'digital'
  | 'about'
  | 'privacy'
  | 'contact';

export interface ArticleMeta {
  id: PageId;
  title: string;
  pageTitle: string;
  lead: string;
  category: string;
  tag: string;
  readTime: string;
  date: string;
  cardColor: string;
  coverClass: string;
  artType: 'evening' | 'desk' | 'week' | 'morning' | 'entry' | 'pause' | 'drawer' | 'grocery' | 'digital';
  asideLinks: { text: string; anchorId?: string }[];
  asideNote?: string;
}

export type ThemeMode = 'light' | 'dark';
