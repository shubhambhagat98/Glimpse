import * as RootNavigation from '../utils/RootNavigation';

export const openArticleDetails = (index, article) => {
  RootNavigation.navigate('ArticleDetails', {
    article,
    index,
  });
};

export const openArticleWebView = (index, article) => {
  RootNavigation.navigate('ArticleWebView', {
    index,
    article,
  });
};
