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

  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const otherArticles = articles.filter((a) => a.id !== featuredArticle.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-[80vh] p-4">
      {/* Featured Article: large and occupies 2x2-style visual space */}
      <div className="h-full">
        <ArticleCard article={featuredArticle} onReadMore={onReadMore} />
      </div>

      {/* Right Column: vertically scrollable list */}
      <div className="overflow-y-auto space-y-4 pr-2">
        {otherArticles.map((article) => (
          <div key={article.id}>
            <ArticleCard article={article} onReadMore={onReadMore} />
          </div>
        ))}
      </div>
    </div>
  );
}
