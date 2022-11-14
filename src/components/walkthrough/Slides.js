export const Slides = [
  {
    id: 0,
    title: 'Wake up Alan',
    intent: 'Activate Alan',
    info: 'You can click on the Alan button on bottom-right or use the wake word to activate the Alan voice-assistant.',
    example: ['Hey, Alan', 'Ok, Alan'],
  },
  {
    id: 1,
    title: 'Latest News',
    intent: 'latest news',
    info: 'By default, the app provides you latest news. But you can also explicitly ask Alan to fetch the latest news for you.',
    example: ['Give me the latest news', 'Bring me the latest headlines'],
  },
  {
    id: 2,
    title: 'News by Categories',
    intent: 'search',
    info: 'Business, Sport, Tech, Finance, Politics, Food, Science, Music, Travel, Economics, Gaming, Entertainment, Energy',
    example: [
      'Give me the latest business news',
      'Give me the news about business',
    ],
  },

  {
    id: 3,
    title: 'News by Terms',
    intent: 'search',
    info: 'Bitcoin, PlayStation 5, Smartphones, iPhone, LinkedIn, Elon Musk, Twitter...',
    example: ["What's up with Elon Musk", 'Tell me something about Bitcoin'],
  },
  {
    id: 4,
    title: 'News by Sources',
    info: 'CNN, CBS News, Time, IGN, Buzzfeed, Bloomberg, Sky, Foxnews, CNBC...',
    intent: 'search',
    example: [
      'Give me the news from CNN',
      'Bring me the latest news from CBS News',
    ],
  },
  {
    id: 5,
    title: 'Read headlines',
    intent: 'read headline',
    info: 'You can explicitly ask Alan to read the headlines of news articles for you.',
    example: ['Read the headlines', 'Read me the news', 'Continue reading'],
  },
  {
    id: 6,
    title: 'Open article summary',
    intent: 'Open article',
    info: 'After fetching news articles you can ask Alan to open the article summary page based on article index. This also works with ordinal numbers.',
    example: ['Open the 1st article', 'Open article number 1'],
  },
  {
    id: 7,
    title: 'Open article webpage',
    intent: 'Open article',
    info: 'When you are on the article summary page, you can ask Alan to open the article webpage and view the complete article.',
    example: ['Open the full article', 'Open the complete article'],
  },
  {
    id: 8,
    title: 'Navigation',
    intent: 'navigate',
    info: 'Navigate to previous page or directly go to the Main Screen or Home Page.',
    example: ['Go back', 'Go back to main screen', 'Go back to home page'],
  },
];
