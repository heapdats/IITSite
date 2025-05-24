import type { Article } from '@/types';
import { ArticleCard } from './article-card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { a } from 'genkit/lib/index-oOKwwZT5';

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-[80vh] p-4">
      {/* Left Column: Carousel for featured articles */}
      <div className="h-[80vh] min-w-0">
  {featuredArticles.length > 0 ? (
    <Slider {...sliderSettings}>
      {featuredArticles.map((article) => (
        <div key={article.id} className="px-2 flex w-full">
          <ArticleCard article={article} onReadMore={onReadMore} />
        </div>
      ))}
    </Slider>
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
