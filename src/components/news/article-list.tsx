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
  {/* Left Column: Featured */}
  <div className="h-full">
    <ArticleCard article={featuredArticle} onReadMore={onReadMore} />
  </div>

  {/* Right Column: Scrollable list container */}
  <div className="flex flex-col h-full min-h-0">
    {/* Wrapper that can scroll if content overflows */}
    <div className="overflow-y-auto flex-1 space-y-4 pr-2">
      {otherArticles.map((article) => (
        <div key={article.id}>
          <ArticleCard article={article} onReadMore={onReadMore} />
        </div>
      ))}
    </div>
  </div>
</div>


  );
}
