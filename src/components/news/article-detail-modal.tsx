"use client";

import type { Article } from '@/types';
import { summarizeArticle } from '@/ai/flows/summarize-article';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
<<<<<<< HEAD
=======
  DialogHeader,
  DialogTitle,
  DialogDescription,
>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ExternalLink, Newspaper, Brain } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

<<<<<<< HEAD
=======

>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
interface ArticleDetailModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleDetailModal({ article, isOpen, onClose }: ArticleDetailModalProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
<<<<<<< HEAD
=======
    // Reset summary when article changes or modal opens/closes
>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
    setSummary(null);
  }, [article, isOpen]);

  if (!article) return null;

  const handleSummarize = async () => {
    if (!article.content) {
<<<<<<< HEAD
      toast({
        title: "Error",
        description: "Article content is empty, cannot summarize.",
        variant: "destructive"
      });
      return;
    }
    setIsLoadingSummary(true);
    setSummary(null);
=======
        toast({ title: "Error", description: "Article content is empty, cannot summarize.", variant: "destructive" });
        return;
    }
    setIsLoadingSummary(true);
    setSummary(null); 
>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
    try {
      const result = await summarizeArticle({ articleContent: article.content });
      setSummary(result.summary);
      toast({ title: "Summary Generated", description: "Article summary loaded successfully." });
    } catch (error) {
      console.error("Error summarizing article:", error);
<<<<<<< HEAD
      toast({
        title: "Summarization Failed",
        description: "Could not generate summary. Please try again.",
        variant: "destructive"
      });
=======
      toast({ title: "Summarization Failed", description: "Could not generate summary. Please try again.", variant: "destructive" });
>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
    } finally {
      setIsLoadingSummary(false);
    }
  };

<<<<<<< HEAD
  const formattedDate = article.publishedDate
    ? format(new Date(article.publishedDate), "MMMM d, yyyy 'at' h:mm a")
    : 'N/A';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col p-0 overflow-hidden">
        
        {/* Image with overlayed text */}
        <div className="relative w-full h-64">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-end p-6 space-y-2 text-white">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <p className="text-sm">
              By {article.author || 'Unknown Author'} | Published: {formattedDate}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{article.category.toUpperCase()}</Badge>
              <Badge variant="outline" asChild>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white"
                >
                  {article.sourceName}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden flex-grow min-h-0">
          {/* Full Article Content */}
          <ScrollArea className="md:h-[calc(80vh-200px)] h-[calc(40vh-100px)] p-6 border-r">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Newspaper className="mr-2 h-5 w-5 text-primary" /> Full Article
            </h3>
            <article
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, '<br />'),
              }}
            />
          </ScrollArea>

          {/* Summary Panel */}
          <ScrollArea className="md:h-[calc(80vh-200px)] h-[calc(40vh-100px)] p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" /> AI Summary
            </h3>
            {!summary && !isLoadingSummary && (
              <Button
                onClick={handleSummarize}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Brain className="mr-2 h-4 w-4" />
                Generate Summary
              </Button>
            )}
            {isLoadingSummary && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating summary...</p>
              </div>
            )}
            {summary && (
              <div className="prose prose-sm max-w-none text-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  {summary.split('\n').map((item, index) =>
                    item.trim() && <li key={index}>{item.replace(/^- /, '')}</li>
                  )}
                </ul>
              </div>
            )}
            {!summary && !isLoadingSummary && (
              <p className="text-sm text-muted-foreground mt-4">
                Click "Generate Summary" to get AI-powered bullet points of this article.
              </p>
            )}
          </ScrollArea>
        </div>

        {/* Footer */}
=======
  const formattedDate = article.publishedDate ? format(new Date(article.publishedDate), "MMMM d, yyyy 'at' h:mm a") : 'N/A';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary">{article.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            By {article.author || 'Unknown Author'} | Published: {formattedDate}
          </DialogDescription>
          <div className="flex flex-wrap gap-2 pt-2">
             <Badge variant="secondary">{article.category.toUpperCase()}</Badge>
             <Badge variant="outline" asChild>
                <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {article.sourceName} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
             </Badge>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden flex-grow min-h-0">
            <ScrollArea className="md:h-[calc(80vh-200px)] h-[calc(40vh-100px)] p-6 border-r">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Newspaper className="mr-2 h-5 w-5 text-primary" /> Full Article</h3>
                <article className="prose prose-sm max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
            </ScrollArea>
            
            <ScrollArea className="md:h-[calc(80vh-200px)] h-[calc(40vh-100px)] p-6">
                 <h3 className="text-lg font-semibold mb-2 flex items-center"><Brain className="mr-2 h-5 w-5 text-primary" /> AI Summary</h3>
                {!summary && !isLoadingSummary && (
                    <Button onClick={handleSummarize} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Summary
                    </Button>
                )}
                {isLoadingSummary && (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-2 text-muted-foreground">Generating summary...</p>
                    </div>
                )}
                {summary && (
                    <div className="prose prose-sm max-w-none text-foreground">
                        <ul className="list-disc pl-5 space-y-1">
                            {summary.split('\n').map((item, index) => 
                                item.trim() && <li key={index}>{item.replace(/^- /, '')}</li>
                            )}
                        </ul>
                    </div>
                )}
                 {!summary && !isLoadingSummary && <p className="text-sm text-muted-foreground mt-4">Click "Generate Summary" to get AI-powered bullet points of this article.</p>}
            </ScrollArea>
        </div>

>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
        <DialogFooter className="p-6 pt-0 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
