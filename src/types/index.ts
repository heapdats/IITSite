
export interface Article {
  id: string;
  title: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  publishedDate: string;
  category: string;
  imageUrl: string;
  summary?: string;
  author?: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  imageIcon?: string;
}

