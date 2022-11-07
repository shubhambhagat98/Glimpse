import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import * as RootNavigation from '../utils/RootNavigation';
import {NativeEventEmitter, NativeModules, LogBox} from 'react-native';
import {Search} from '../components/SearchBar/Search';
import {CategoryList} from '../components/categories/CategoryList';
import {useStore} from '../store/Store';
import {newsAPI} from '../api/Api';
import {NewsList} from '../components/news/NewsList';
import {initialCategory, getMatchedCategory} from '../utils/FilterUtility';
import {
  openArticleDetails,
  openArticleWebView,
} from '../utils/NavigationUtility';
import {PopupMenu} from '../components/popupmenu/PopupMenu';
import {withMenuContext} from 'react-native-popup-menu';
import {
  setAlanVisualState,
  deactivateAlan,
  playTextHandler,
  getParsedNumber,
  sendLastNewsIndexToAlan,
  sendNewsArticlesToAlan,
} from '../utils/AlanUtility';
LogBox.ignoreLogs([
  'Warn: Task orphaned for request',
  'Warn: Did not receive response to shouldStartLoad in time, defaulting to YES',
]);

const {AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

export const HomeScreen = withMenuContext(
  ({navigation, route: {params}, ctx}) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const [buttonState, setButtonState] = useState(null);
    const [notInitialLoad, setNotInitialLoad] = useState(false);
    const [isAlanReading, setIsAlanReading] = useState(false);

    const setKeyword = useStore(state => state.setKeyword);
    const setActiveCategory = useStore(state => state.setActiveCategory);
    const setIntent = useStore(state => state.setIntent);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef();

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

    useFocusEffect(
      React.useCallback(() => {
        navigation.setOptions({
          title: 'Glimpse',
          headerRight: () => <PopupMenu name="popup-menu" />,
        });
      }, [navigation]),
    );

    useEffect(() => {
      alanEventEmitter.addListener('onCommand', data => {
        let command = data.command;
        switch (command) {
          case 'newHeadlines':
            // console.log(data.articles.length);
            setNewsArticles(data.articles);
            setActiveArticle(-1);
            updateStore(data.keyword, data.category, data.intent);
            break;
          case 'highlight':
            setActiveArticle(prev => prev + 1);
            sendLastNewsIndexToAlan(data.number);
            setIsAlanReading(true);
            break;
          case 'openArticleDetails':
            let parsedNumber = getParsedNumber(
              data.number,
              data.articles.length,
            );
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
            navigation.popToTop();
            break;
          case 'stop':
            deactivateAlan();
          case 'deHighlight':
            setIsAlanReading(false);
            break;
          default:
            break;
        }
      });

      alanEventEmitter.addListener('onButtonState', state => {
        // console.log('Alan state ==>', state);
        if (state === 'ONLINE') {
          setButtonState(state);
          setIsAlanReading(false);
        }
      });

      //fetch initial latest headlines
      fetchNewsData('/latest_headlines', {when: '24h'});
      setActiveCategory(initialCategory);

      return () => {
        alanEventEmitter.removeAllListeners('onCommand');
        alanEventEmitter.removeAllListeners('onButtonState');
      };
    }, []);

    const setVisualState = () => {
      // console.log('inside set visual state');
      setAlanVisualState('HomeScreen');
      setNotInitialLoad(true);
    };

    const fetchNewsData = (url, paramObj) => {
      setIsLoading(true);
      setIsError(false);
      deactivateAlan();

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
          setIsAlanReading(false);

          // send articles to Alan
          sendNewsArticlesToAlan(articles);
          setIsLoading(false);
          setIsError(false);

          // console.log(articles[0]);
        })
        .catch(error => {
          console.log(error.response);
          playTextHandler('Could not get news articles information');
          setIsLoading(false);
          setIsError(true);
        });
    };

    const updateStore = (keyword, category, intent) => {
      // console.log(keyword, category, intent);

      const matchedCategory = getMatchedCategory(category);

      setKeyword(keyword);
      setActiveCategory({
        id: matchedCategory.id,
        header: matchedCategory.header,
      });

      setIntent(intent);

      inputRef.current.clear();
      // popupMenuRef.current.close();
      closeMenu();
    };

    const closeMenu = () => {
      // console.log('insode close menu');
      ctx.menuActions.closeMenu('popup-menu');
    };

    return (
      <View style={styles.container}>
        <Search fetchNewsData={fetchNewsData} ref={inputRef} />
        <CategoryList fetchNewsData={fetchNewsData} />

        {isLoading ? (
          <ActivityIndicator size="large" marginVertical={30} />
        ) : (
          <NewsList
            newsList={newsArticles}
            activeArticle={activeArticle}
            isAlanReading={isAlanReading}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfe',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
