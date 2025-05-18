import type { Article, Category } from '@/types';
import { Landmark, Cpu, Trophy, Briefcase, Globe, Cog } from 'lucide-react';

export const categories: Category[] = [
  { id: 'all', name: 'All', icon: Globe },
  { id: 'politics', name: 'Politics', icon: Landmark },
  { id: 'technology', name: 'Technology', icon: Cpu },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'general', name: 'General', icon: Cog },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Breaking: New Tech Innovation Shakes the Market',
    content: 'A revolutionary new technology has been unveiled today, promising to change the way we interact with digital devices. Experts are calling it a game-changer, with potential impacts across various industries. The device, developed by a stealth startup, boasts features never before seen in consumer electronics. Shares of established tech giants dipped slightly on the news, as investors speculate on the disruptive potential of this new entrant. The company plans a full product launch next quarter. Further details about its specifications and pricing are expected to be released in the coming weeks. The development team, led by renowned innovator Dr. Alex Chen, has been working on this project for over five years in complete secrecy. Early demos have impressed tech critics, though some raise concerns about privacy implications which the company has pledged to address proactively.',
    sourceName: 'Tech Chronicle',
    sourceUrl: 'https://example.com/tech-news-1',
    publishedDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    category: 'technology',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Jane Doe',
  },
  {
    id: '2',
    title: 'Global Summit Addresses Climate Change Urgently',
    content: 'Leaders from around the world convened today for an emergency summit on climate change. The talks are focused on setting more ambitious emissions targets and providing financial aid to developing nations for green initiatives. Activists have gathered outside the summit venue, urging policymakers to take decisive action. The summit is expected to last three days, with a final communiqué outlining new commitments. Scientific reports presented at the opening session painted a stark picture of the accelerating climate crisis. Discussions have reportedly been intense, with significant disagreements on burden-sharing and the phasing out of fossil fuels. However, a spokesperson for the summit expressed cautious optimism that a meaningful agreement could be reached.',
    sourceName: 'World News Agency',
    sourceUrl: 'https://example.com/world-news-1',
    publishedDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    category: 'politics',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'John Smith',
  },
  {
    id: '3',
    title: 'Champions League Final: Underdogs Triumph in Thrilling Match',
    content: 'In a stunning upset, FC Dynamos defeated the reigning champions, Real Strikers, in a nail-biting Champions League final. The match, which went into extra time, was decided by a last-minute goal from Dynamos\' star striker. Fans erupted in celebration as the underdog team lifted the coveted trophy for the first time in their history. The game was marked by dramatic twists and turns, including a controversial red card and a saved penalty. Analysts are praising the tactical genius of the Dynamos coach and the resilience of their players. The victorious team is expected to receive a heroes\' welcome upon their return home.',
    sourceName: 'Sports Today',
    sourceUrl: 'https://example.com/sports-news-1',
    publishedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    category: 'sports',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Mike Johnson',
  },
  {
    id: '4',
    title: 'Market Volatility Continues Amid Economic Uncertainty',
    content: 'Stock markets experienced another turbulent day of trading as investors grapple with ongoing economic uncertainty. Key indices saw significant fluctuations, driven by mixed corporate earnings reports and concerns about inflation. Central banks are under pressure to address rising prices without derailing economic recovery. Financial analysts advise caution, suggesting that volatility may persist in the short term. Several sectors, including energy and commodities, saw gains, while technology and consumer discretionary stocks faced downward pressure. The upcoming release of employment data is eagerly awaited by market participants for further clues on the economic outlook.',
    sourceName: 'Financial Times',
    sourceUrl: 'https://example.com/business-news-1',
    publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    category: 'business',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Sarah Lee',
  },
  {
    id: '5',
    title: 'New AI Model Achieves Human-Level Text Generation',
    content: 'Researchers have announced a breakthrough in artificial intelligence with a new language model capable of generating text indistinguishable from human writing. The model, named "ScribeX," demonstrates remarkable coherence, creativity, and contextual understanding. Potential applications range from automated content creation to advanced chatbots and translation services. However, the development also raises ethical concerns about misuse, such as generating fake news or impersonation. The research team emphasizes the importance of responsible AI development and deployment. ScribeX was trained on an unprecedentedly large dataset of text and code, requiring immense computational resources.',
    sourceName: 'AI Insights',
    sourceUrl: 'https://example.com/tech-news-2',
    publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    category: 'technology',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'David Kim',
  },
  {
    id: '6',
    title: 'Local Elections See Record Turnout',
    content: 'Yesterday\'s local elections saw a record voter turnout, signaling high civic engagement. The results are expected to bring significant changes to local governance in several key districts. Close races are still being counted, with final outcomes anticipated by tomorrow morning. Political analysts attribute the increased participation to heightened awareness of local issues and effective get-out-the-vote campaigns. Both major parties are claiming partial victories based on preliminary results. The election process was reported to be smooth, with minimal disruptions.',
    sourceName: 'City Herald',
    sourceUrl: 'https://example.com/politics-news-2',
    publishedDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    category: 'politics',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Emily Carter',
  },
   {
    id: '7',
    title: 'The Future of Remote Work: A Hybrid Approach',
    content: 'A new study indicates that a hybrid model, combining remote and in-office work, is becoming the preferred approach for many companies and employees post-pandemic. The report highlights benefits such as increased flexibility, improved work-life balance, and access to a wider talent pool. However, challenges remain in areas like team cohesion, equitable opportunities for remote workers, and cybersecurity. Companies are experimenting with various hybrid structures to find what works best for their specific needs and culture. The study surveyed over 500 organizations across different industries.',
    sourceName: 'Workplace Trends',
    sourceUrl: 'https://example.com/business-news-2',
    publishedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    category: 'business',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Chris Williams',
  },
  {
    id: '8',
    title: 'SpaceX Launches New Batch of Starlink Satellites',
    content: 'SpaceX successfully launched another Falcon 9 rocket carrying a new batch of Starlink satellites into orbit. This mission further expands the company\'s ambitious satellite internet constellation, aiming to provide high-speed internet access to underserved areas globally. The launch and booster landing were executed flawlessly, marking another milestone for the private space exploration company. The Starlink network now comprises over two thousand active satellites. While praised for its technological achievement, the project has also drawn criticism from astronomers concerned about light pollution and space debris.',
    sourceName: 'SpaceTech Now',
    sourceUrl: 'https://example.com/tech-news-3',
    publishedDate: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    category: 'technology',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Olivia Brown',
  }
];
