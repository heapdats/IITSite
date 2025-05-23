import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import mysql from 'mysql2/promise';

const FEEDS = [
  { url: 'https://rss.app/feeds/cfWqYLRJ0yaAuHWo.xml', tag: 'coe', sourceName:"The Thu'um Publication" },
  { url: 'https://rss.app/feeds/JJlhxOrDD6vWD3TL.xml', tag: 'csm', sourceName:'Ad Infinitum' },
  { url: 'https://rss.app/feeds/nmLQY9LltbmMfVyj.xml', tag: 'css', sourceName:'CASSayuran IIT' },
  { url: 'https://rss.app/feeds/qUMEZ7moBZJhG5eW.xml', tag: 'ccs', sourceName:'The Motherboard' },
  // add more feeds here with their 3-char tag
];

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'my_website_db',
};

async function fetchRSSData(url: string) {
  const res = await axios.get(url);
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(res.data);
  return parsed.rss.channel.item;
}

async function insertPostToDB(
  connection: mysql.Connection,
  post: any,
  tag: string,
  sourceName: string
) {
  const descriptionText = post.description ? post.description.replace(/<[^>]+>/g, '').trim() : '';
  const imageMatch = post.description ? post.description.match(/<img[^>]+src="([^">]+)"/) : null;
  const image = imageMatch ? imageMatch[1] : null;

  const query = `
    INSERT INTO rss_posts (title, description, image, link, pubDate, tag, sourceName)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), image = VALUES(image), pubDate = VALUES(pubDate), tag = VALUES(tag), sourceName = VALUES(sourceName)
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

async function main() {
  const connection = await mysql.createConnection(DB_CONFIG);

  for (const feed of FEEDS) {
    const items = await fetchRSSData(feed.url);

    for (const item of items) {
      await insertPostToDB(connection, item, feed.tag, feed.sourceName);
    }
  }

  console.log('All RSS feeds processed and inserted into the database.');
  await connection.end();
}

main().catch(console.error);
