import fs from 'fs';
import mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'my_website_db',
};

const filePath = 'src/data/mock-data.ts';

async function generateStaticArticles() {
  const connection = await mysql.createConnection(DB_CONFIG);
  const [rows] = await connection.execute(`
    SELECT id, title, description AS content, image AS imageUrl, link AS sourceUrl,
           pubDate, tag AS category, sourceName
    FROM rss_posts
    ORDER BY pubDate DESC
    LIMIT 20
  `);
  await connection.end();

  const newArticles = (rows as any[]).map((row, index) => ({
    id: row.id.toString(),
    title: (row.title ?? '').replace(/'/g, "\\'"),
    content: (row.content ?? '').replace(/'/g, "\\'"),
    sourceName: (row.sourceName ?? '').replace(/'/g, "\\'"),
    sourceUrl: row.sourceUrl,
    publishedDate: new Date(row.pubDate).toISOString(),
    category: row.category,
    imageUrl: row.imageUrl ?? '',
    isFeatured: index < 3,
  }));

  if (!fs.existsSync(filePath)) {
  // If file does not exist, create new with header + articles
  const header = "import type { Article } from '@/types';\n\n";
  
  function escapeForSingleQuotedString(str: string) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n');
  }

  const newArrayContent =
    '[\n' +
    newArticles
      .map(
        (a) => `  {
    id: '${escapeForSingleQuotedString(a.id)}',
    title: '${escapeForSingleQuotedString(a.title)}',
    content: '${escapeForSingleQuotedString(a.content)}',
    sourceName: '${escapeForSingleQuotedString(a.sourceName)}',
    sourceUrl: '${escapeForSingleQuotedString(a.sourceUrl)}',
    publishedDate: '${a.publishedDate}',
    category: '${escapeForSingleQuotedString(a.category)}',
    imageUrl: '${escapeForSingleQuotedString(a.imageUrl)}',
    isFeatured: ${a.isFeatured},
  }`
      )
      .join(',\n') +
    '\n]';

  const newFileContent = `${header}export const articles: Article[] = ${newArrayContent};\n`;

  fs.writeFileSync(filePath, newFileContent, 'utf8');
  console.log('data.ts created with new articles');
} else {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Capture header + export + array content
  const match = fileContent.match(/([\s\S]*?)(export const articles: Article\[\] = )(\[[\s\S]*\]);/);

  if (!match) {
    throw new Error('Could not find articles export in file');
  }

  const header = match[1];
  const exportStart = match[2];
  const arrayContent = match[3];

  let existingArticles: any[] = [];

  try {
    const inner = arrayContent.slice(1, -1);
    const jsonLike = '[' + inner.replace(/'/g, '"') + ']';
    existingArticles = JSON.parse(jsonLike);
  } catch (e) {
    console.warn('Failed to parse existing articles, continuing with empty list');
  }

  const mergedArticlesMap = new Map<string, any>();
  for (const art of existingArticles) mergedArticlesMap.set(art.id, art);
  for (const art of newArticles) mergedArticlesMap.set(art.id, art);
  const mergedArticles = Array.from(mergedArticlesMap.values());

  function escapeForSingleQuotedString(str: string) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n');
  }

  const newArrayContent =
    '[\n' +
    mergedArticles
      .map(
        (a) => `  {
    id: '${escapeForSingleQuotedString(a.id)}',
    title: '${escapeForSingleQuotedString(a.title)}',
    content: '${escapeForSingleQuotedString(a.content)}',
    sourceName: '${escapeForSingleQuotedString(a.sourceName)}',
    sourceUrl: '${escapeForSingleQuotedString(a.sourceUrl)}',
    publishedDate: '${a.publishedDate}',
    category: '${escapeForSingleQuotedString(a.category)}',
    imageUrl: '${escapeForSingleQuotedString(a.imageUrl)}',
    isFeatured: ${a.isFeatured},
  }`
      )
      .join(',\n') +
    '\n]';

  const newFileContent = `${header}${exportStart}${newArrayContent};\n`;

  fs.writeFileSync(filePath, newFileContent, 'utf8');
  console.log('data.ts updated preserving header and merged articles.');
}
}
generateStaticArticles().catch(console.error);
