import Image from 'next/image';
import type { Article } from '@/types';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FeaturedArticleCardProps {
  article: Article;
  onReadMore: (article: Article) => void;
}

export function FeaturedArticleCard({ article, onReadMore }: FeaturedArticleCardProps) {
  return (
    <Card className="flex flex-col h-full">
      {/* Image + Title */}
      <CardHeader className="relative p-0 flex-grow">
        <div className="relative w-full h-full min-h-[460px]">
          <Image
            src={article.imageUrl}
            alt={article.title || 'Article image'}
            fill
            className="object-cover rounded-t-md"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 px-6 pb-6 pt-10 flex flex-col justify-end space-y-2">
            <Badge
              variant="default"
              className="absolute top-4 right-4 text-xs px-2 py-1 shadow-md flex items-center gap-1"
            >
              <Star className="h-3 w-3" />
              FEATURED
            </Badge>
            <Badge variant="secondary" className="w-fit text-sm">
              {(article.category || 'General').toUpperCase()}
            </Badge>
            <CardTitle className="text-white text-4xl font-bold leading-snug line-clamp-3">
              {article.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-xs text-muted-foreground hover:text-primary"
        >
          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
            {article.sourceName}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
        <Button
          onClick={() => onReadMore(article)}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Read & Summarize
        </Button>
      </CardFooter>
    </Card>
  );
}
