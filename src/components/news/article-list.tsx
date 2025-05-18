import type { Article } from '@/types';
import { ArticleCard } from './article-card';

interface ArticleListProps {
  articles: Article[];
  onReadMore: (article: Article) => void;
}

export function ArticleList({ articles, onReadMore }: ArticleListProps) {
  if (articles.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No articles found for this category.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
      ))}
    </div>
  );
}
