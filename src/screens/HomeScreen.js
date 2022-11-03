import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import * as RootNavigation from '../utils/RootNavigation';
import wordsToNumbers from 'words-to-numbers';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {Search} from '../components/SearchBar/Search';
import {CategoryList} from '../components/categories/CategoryList';
import {useStore} from '../store/Store';
import newsList from '../mock/articles.json';
import {newsAPI} from '../api/Api';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

export const HomeScreen = ({
  navigation: {navigate, popToTop},
  route: {params},
}) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const [buttonState, setButtonState] = useState(null);
  const [notInitialLoad, setNotInitialLoad] = useState(false);
  const keyword = useStore(state => state.keyword);
  const activeCategory = useStore(state => state.activeCategory);

  useFocusEffect(
    React.useCallback(() => {
      setVisualState();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      notInitialLoad && buttonState === 'ONLINE' && setVisualState();
    }, [buttonState]),
  );

  useEffect(() => {
    alanEventEmitter.addListener('onCommand', data => {
      let command = data.command;
      switch (command) {
        case 'newHeadlines':
          console.log(data.articles.length);
          setNewsArticles(data.articles);
          setActiveArticle(-1);
          break;
        case 'highlight':
          setActiveArticle(prev => prev + 1);
          sendLastNewsIndexToAlan(data.number);
          break;
        case 'openArticleDetails':
          let parsedNumber = getParsedNumber(data.number, data.articles.length);
          if (parsedNumber !== -1) {
            openArticleDetails(
              parsedNumber - 1,
              data.articles[parsedNumber - 1],
            );
          }
          break;
        case 'openArticleWebView':
          playTextHandler('Opening');
          openArticleWebView(data.number, data.article);
          break;
        case 'goBack':
          RootNavigation.goBack();
          break;
        case 'goBackToHomeScreen':
          popToTop();
          break;
        case 'stop':
          deactivateAlan();
        default:
          break;
      }
    });

    alanEventEmitter.addListener('onButtonState', state => {
      // console.log(state);
      if (state === 'ONLINE') {
        setButtonState(state);
      }
    });

    //fetch initial latest headlines
    // fetchNewsData('/latest_headlines', {when: '24h'});

    return () => {
      alanEventEmitter.removeAllListeners('onCommand');
      alanEventEmitter.removeAllListeners('onButtonState');
    };
  }, []);

  const sendLastNewsIndexToAlan = index => {
    // console.log("inside call project api ==>", index);
    AlanManager.callProjectApi(
      'setLastNewsIndex',
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

  const sendNewsArticlesToAlan = articles => {
    // console.log("inside call project api ==>", index);
    AlanManager.callProjectApi(
      'setSavedArticles',
      {articles: articles},
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      },
    );
  };

  const setVisualState = () => {
    // console.log('inside set visual state');
    AlanManager.setVisualState({screen: 'HomeScreen'});
    setNotInitialLoad(true);
  };

  const deactivateAlan = () => {
    AlanManager.deactivate();
  };

  const isAlanActive = () => {
    return AlanManager.isActive((error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });
  };

  const playTextHandler = input => {
    !isAlanActive() && AlanManager.activate();
    AlanManager.playText(input);
  };

  const getParsedNumber = (number, articleCount) => {
    console.log('length: ', articleCount);

    const parsedNumber =
      number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;

    console.log('parsed  number ==>', parsedNumber);

    if (parsedNumber > articleCount || parsedNumber < 1) {
      playTextHandler('Please try that again.');
      return -1;
    } else {
      playTextHandler('Opening');
      return parsedNumber;
    }
  };

  const openArticleDetails = (index, article) => {
    navigate('ArticleDetails', {
      article,
      index,
    });
  };

  const openArticleWebView = (index, article) => {
    navigate('ArticleWebView', {
      index,
      article,
    });
  };

  const fetchNewsData = (url, paramObj) => {
    newsAPI
      .get(url, {
        params: {
          countries: 'US',
          lang: 'en',
          page: 1,
          ...paramObj,
        },
      })
      .then(response => {
        let data = response.data;
        let articles = data.articles ? data.articles : null;
        if (articles === null) {
          playTextHandler('Sorry, please try searching for something else.');
          return;
        }

        //set articles in APP
        setNewsArticles(articles);
        setActiveArticle(-1);

        // send articles to Alan
        sendNewsArticlesToAlan(articles);
        console.log(articles[0]);
      })
      .catch(error => {
        console.log(error.response);
        playTextHandler('Could not get news articles information');
      });
  };

  const renderItem = ({item: {title, published_date, media, rights}}) => {
    return (
      <View style={styles.newsCard}>
        <Text>
          {title} {rights}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Search fetchNewsData={fetchNewsData} />
      <CategoryList fetchNewsData={fetchNewsData} />
      <FlatList
        data={newsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      {/* <Text>active category: {activeCategory.header} </Text>
      <Text>search keyword: {keyword}</Text>
      <Text>article length: {newsArticles.length}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  newsCard: {
    height: 100,
    marginVertical: 15,
  },
});
