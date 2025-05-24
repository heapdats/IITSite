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
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  onReadMore: (article: Article) => void;
}

export function ArticleCard({ article, onReadMore }: ArticleCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden",
        article.isFeatured ? "h-[80vh] max-h-screen" : ""
      )}
    >
      {/* Image Header */}
      <CardHeader className="p-0 relative aspect-[1/1] w-full">
        <div className="relative w-full h-full">
          <Image
            src={article.imageUrl}
            alt={article.title || 'Article image'}
            fill
            className="object-cover rounded-t-md"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 p-4 flex flex-col justify-end">
            {article.isFeatured && (
              <Badge
                variant="default"
                className="absolute top-3 right-3 text-xs px-2 py-1 shadow-md flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                FEATURED
              </Badge>
            )}
            <Badge variant="secondary" className="mb-1 w-fit">
              {(article.category || 'General').toUpperCase()}
            </Badge>
            <CardTitle className="text-white text-base leading-tight">
              {article.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      {/* Footer */}
      <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
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