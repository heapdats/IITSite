import type { Article } from '@/types';
import { ArticleCard } from './article-card';

interface ArticleListProps {
  articles: Article[];
  onReadMore: (article: Article) => void;
}

export function ArticleList({ articles, onReadMore }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No articles found for this category.
      </p>
    );
  }

  const featuredArticles = articles.filter((a) => a.isFeatured);
  const otherArticles = articles.filter((a) => !a.isFeatured);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-[80vh] p-4">
      {/* Left Column: All featured articles */}
      <div className="overflow-y-auto space-y-4 h-[80vh]">
        {featuredArticles.length > 0 ? (
          featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No featured articles.
          </p>
        )}
      </div>

      {/* Right Column: All non-featured articles */}
      <div className="overflow-y-auto space-y-4 pr-2 h-[80vh]">
        {otherArticles.length > 0 ? (
          otherArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No other articles.
          </p>
        )}
      </div>
    </div>
  );
}
