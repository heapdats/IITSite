"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Article, Category } from '@/types';
import { articles as mockArticles, categories as mockCategories } from '@/data/mock-data';
import { Header } from '@/components/layout/header';
import { CategoryFilter } from '@/components/news/category-filter';
import { ArticleList } from '@/components/news/article-list';
import { ArticleDetailModal } from '@/components/news/article-detail-modal';
import { AddRssFeedModal } from '@/components/news/add-rss-feed-modal';
import { ArrowDownUp, CalendarClock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewsPage() {
  const [allArticles, setAllArticles] = useState<Article[]>(mockArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isAddFeedModalOpen, setIsAddFeedModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'recency' | 'title'>('recency');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSelectCategory = (categoryId: string) => setSelectedCategory(categoryId);

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const handleCloseArticleModal = () => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
  };

  const handleAddFeedClick = () => setIsAddFeedModalOpen(true);

  const handleCloseAddFeedModal = () => setIsAddFeedModalOpen(false);

  const handleFeedAdd = async (data: { name: string; url: string }) => {
    console.log("Feed added (simulated):", data);
  };

  const filteredArticles = useMemo(() => {
    if (!hydrated) return [];
    let articlesToFilter = [...allArticles];
    if (selectedCategory !== 'all') {
      articlesToFilter = articlesToFilter.filter(article => article.category === selectedCategory);
    }

    return articlesToFilter.sort((a, b) => {
      if (sortOrder === 'recency') {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }, [allArticles, selectedCategory, sortOrder, hydrated]);

  if (!hydrated) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header onAddFeedClick={() => {}} />
        <main className="container mx-auto px-4 py-6 flex-grow">
          <div className="text-center py-10 text-muted-foreground">Loading news...</div>
        </main>
        <footer className="bg-card text-center p-4 text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} NOWIIT. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onAddFeedClick={handleAddFeedClick} />
      <main className="container mx-auto px-4 py-4 flex-grow">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <CategoryFilter
              categories={mockCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          <Select value={sortOrder} onValueChange={(value: 'recency' | 'title') => setSortOrder(value)}>
            <SelectTrigger className="w-[175px] h-[60]">
              <ArrowDownUp className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recency">
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Sort by Recency
                </div>
              </SelectItem>
              <SelectItem value="title">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 12c0-2.5-2.5-2.5-2.5-5.5S9 4 9 4"/><path d="M4 4v16"/><path d="M4 10h10.5"/><path d="M4 18h10.5"/><path d="m18 15 3 3 3-3"/><path d="M21 18V6"/></svg>
                  Sort by Title
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ArticleList articles={filteredArticles} onReadMore={handleReadMore} />
      </main>

      <ArticleDetailModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={handleCloseArticleModal}
      />

      <AddRssFeedModal
        isOpen={isAddFeedModalOpen}
        onClose={handleCloseAddFeedModal}
        onFeedAdd={handleFeedAdd}
      />
    </div>
  );
}
