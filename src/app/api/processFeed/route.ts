import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';

const FEED_FILE_PATH = 'src/app/api/feeds.json';

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'my_website_db',
};

async function getFeeds() {
  const data = await fs.readFile(FEED_FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

async function fetchRSSData(url: string) {
  const res = await axios.get(url);
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(res.data);
  return parsed.rss.channel.item || [];
}

async function insertPostToDB(
  connection: mysql.Connection,
  post: any,
  tag: string,
  sourceName: string
) {
  const descriptionText = post.description
    ? post.description.replace(/<[^>]+>/g, '').trim()
    : '';
  const imageMatch = post.description
    ? post.description.match(/<img[^>]+src="([^">]+)"/)
    : null;
  const image = imageMatch ? imageMatch[1] : null;

  const query = `
    INSERT INTO rss_posts (title, description, image, link, pubDate, tag, sourceName)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description),
    image = VALUES(image), pubDate = VALUES(pubDate), tag = VALUES(tag), sourceName = VALUES(sourceName)
  `;

  const values = [
    post.title,
    descriptionText,
    image,
    post.link,
    new Date(post.pubDate),
    tag,
    sourceName,
  ];

  await connection.execute(query, values);
}

export async function POST() {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const feeds = await getFeeds();

    for (const feed of feeds) {
      const items = await fetchRSSData(feed.url);
      for (const item of items) {
        await insertPostToDB(connection, item, feed.tag, feed.sourceName);
      }
    }

    await connection.end();
    return NextResponse.json({ message: 'Feeds processed and inserted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process feeds' }, { status: 500 });
  }
}
