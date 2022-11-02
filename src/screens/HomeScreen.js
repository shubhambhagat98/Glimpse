import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import * as RootNavigation from '../utils/RootNavigation';
import wordsToNumbers from 'words-to-numbers';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {Search} from '../components/SearchBar/Search';
import {CategoryList} from '../components/categories/CategoryList';
import {useStore} from '../store/Store';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

export const HomeScreen = ({navigation: {navigate}, route: {params}}) => {
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
            openArticleDetails(parsedNumber, data.articles[parsedNumber - 1]);
          }
          break;
        case 'goBack':
          RootNavigation.goBack();
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

  const setVisualState = () => {
    // console.log('inside set visual state');
    AlanManager.setVisualState({screen: 'Homescreen'});
    setNotInitialLoad(true);
  };

  const deactivateAlan = () => {
    AlanManager.deactivate();
  };

  const playTextHandler = input => {
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

  const openArticleDetails = (number, article) => {
    navigate('ArticleDetails', {
      article,
      number,
    });
  };

  return (
    <View style={styles.container}>
      <Search />
      <CategoryList />
      <Text>active category: {activeCategory.header} </Text>
      <Text>search keyword: {keyword}</Text>
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
});
