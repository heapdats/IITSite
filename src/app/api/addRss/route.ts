import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const FEED_FILE_PATH = path.resolve(process.cwd(), 'src/app/api/feeds.json');

const rssFeedSchema = z.object({
  name: z.string().min(1, 'Feed name is required'),
  tag: z.string().min(1, 'Tag is required'),
  url: z.string().url('Invalid URL'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = rssFeedSchema.parse(body);

    const data = await fs.readFile(FEED_FILE_PATH, 'utf-8');
    const feeds = JSON.parse(data);

    const exists = feeds.some(feed => feed.url === parsed.url);
    if (exists) {
      return NextResponse.json({ error: 'Feed already exists' }, { status: 409 });
    }

    feeds.push({
      url: parsed.url,
      tag: parsed.tag,
      sourceName: parsed.name,
    });

    await fs.writeFile(FEED_FILE_PATH, JSON.stringify(feeds, null, 2));

    return NextResponse.json({ message: 'Feed added successfully' });
  } catch (error: any) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to add feed' }, { status: 500 });
  }
}
