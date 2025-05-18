import Image from 'next/image';
import type { Article } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, UserCircle, CalendarDays, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  onReadMore: (article: Article) => void;
}

export function ArticleCard({ article, onReadMore }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedDate), { addSuffix: true });

  return (
    <Card className={cn(
      "flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full",
      article.isFeatured && "ring-2 ring-primary ring-offset-background ring-offset-2 shadow-2xl dark:ring-offset-card"
    )}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {article.isFeatured && (
            <Badge
              variant="default"
              className="absolute top-3 right-3 z-10 text-xs px-2 py-1 shadow-md flex items-center gap-1"
            >
              <Star className="h-3 w-3" />
              FEATURED
            </Badge>
          )}
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={`${article.category} news`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{article.category.toUpperCase()}</Badge>
        <CardTitle className="text-lg font-semibold mb-2 leading-tight">{article.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
          {article.content}
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          {article.author && (
            <div className="flex items-center">
              <UserCircle className="w-3 h-3 mr-1.5" />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center">
            <CalendarDays className="w-3 h-3 mr-1.5" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground hover:text-primary">
          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
            {article.sourceName}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
        <Button onClick={() => onReadMore(article)} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Read & Summarize
        </Button>
      </CardFooter>
    </Card>
  );
}
