import {NativeModules} from 'react-native';
import wordsToNumbers from 'words-to-numbers';

const {AlanManager} = NativeModules;

export const setAlanVisualState = screenName => {
  AlanManager.setVisualState({screen: `${screenName}`});
};

export const activateAlan = () => {
  AlanManager.activate();
};

export const deactivateAlan = () => {
  AlanManager.deactivate();
};

export const isAlanActive = () => {
  return AlanManager.isActive((error, result) => {
    if (error) {
      console.error(error);
    }
  });
};

export const playTextHandler = input => {
  !isAlanActive() && AlanManager.activate();
  AlanManager.playText(input);
};

export const getParsedNumber = (number, articleCount) => {
  // console.log('numner from ALAN: ', number);

  const parsedNumber =
    number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;

  // console.log('parsed  number ==>', parsedNumber);

  if (parsedNumber > articleCount || parsedNumber < 1) {
    playTextHandler('Please try that again.');
    return -1;
  } else {
    playTextHandler('Opening');
    return parsedNumber;
  }
};

export const sendNewsArticlesToAlan = articles => {
  // console.log("inside call project api ==>", index);
  AlanManager.callProjectApi(
    'setSavedArticles',
    {articles: articles},
    (error, result) => {
      if (error) {
        console.error(error);
      }
    },
  );
};

export const sendLastNewsIndexToAlan = index => {
  // console.log("inside call project api ==>", index);
  AlanManager.callProjectApi(
    'setLastNewsIndex',
    {index: index},
    (error, result) => {
      if (error) {
        console.error(error);
      }
    },
  );
};

export const sendArticleIndexToAlan = index => {
  // console.log("inside call project api ==>", index);
  AlanManager.callProjectApi(
    'setOpenedArticle',
    {index: index},
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    },
  );
};
