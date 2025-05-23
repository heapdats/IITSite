import mysql from 'mysql2/promise';
import type { Article, Category } from '@/types';
import { Landmark, Cpu, Trophy, Briefcase, Globe, Cog } from 'lucide-react';

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'my_website_db',
};



export const categories: Category[] = [
  { id: 'all', name: 'All', icon: Globe },
  { id: 'coe', name: 'Engineering', icon: Cog },
  { id: 'csm', name: 'Science and Mathematics', icon: Cpu },
  { id: 'ced', name: 'Education', icon: Landmark },
  { id: 'cba', name: 'Economics, Business and Accountancy', icon: Briefcase },
  { id: 'ccs', name: 'Computer Science', icon: Cog },
  { id: 'css', name: 'Arts and Social Science', icon: Cog },
  { id: 'chs', name: 'Health Science', icon: Cog },
];

async function getArticlesFromDB(): Promise<Article[]> {
  const connection = await mysql.createConnection(DB_CONFIG);

  const [rows] = await connection.execute(`
    SELECT id, title, description AS content, image AS imageUrl, link AS sourceUrl, pubDate, tag AS category, sourceName, author, summary
    FROM rss_posts
    ORDER BY pubDate DESC
    LIMIT 20
  `);

  await connection.end();

  return (rows as any[]).map((row, index) => ({
    id: row.id.toString(),
    title: row.title,
    content: row.content,
    sourceName: row.sourceName,
    sourceUrl: row.sourceUrl,
    publishedDate: new Date(row.pubDate).toISOString(),
    category: row.category,
    imageUrl: row.imageUrl ?? '',
    summary: row.summary ?? undefined,
    author: row.author ?? undefined,
    isFeatured: index < 3,  // Example: first 3 articles featured
  }));
}