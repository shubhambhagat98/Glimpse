import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {elevation} from '../../styles/styles';
import * as RootNavigation from '../../utils/RootNavigation';
import {AudioImage} from '../audio/AudioImage';
import {NewsIndex} from './NewsIndex';
import {NativeModules} from 'react-native';
const {AlanManager} = NativeModules;

const NEWS_IMAGE = require('../../assets/images/news-demo.png');

export const NewsCard = ({article, index, activeArticle, isAlanReading}) => {
  const [focusColor, setFocusColor] = useState('#fff');

  const openArticleDetails = (index, article) => {
    isAlanReading && AlanManager.deactivate();

    RootNavigation.navigate('ArticleDetails', {
      article,
      index,
    });
  };
  return (
    <TouchableHighlight
      underlayColor="#dbeffb"
      onShowUnderlay={() => setFocusColor('#dbeffb')}
      onHideUnderlay={() => setFocusColor('#fff')}
      style={[styles.buttonContainer, styles.elevation]}
      onPress={() => {
        openArticleDetails(index, article);
      }}>
      <View
        style={[
          styles.container,
          // {backgroundColor: focusColor},
          {borderBottomColor: focusColor},
          isAlanReading && index === activeArticle && styles.activeCard,
        ]}>
        <ImageBackground
          borderRadius={10}
          source={NEWS_IMAGE}
          resizeMode="cover"
          style={styles.imageContainer}>
          <Image
            source={{
              uri:
                article.media ||
                'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png',
            }}
            style={styles.image}
          />
          {isAlanReading && index === activeArticle ? (
            <AudioImage />
          ) : (
            <NewsIndex index={index + 1} />
          )}
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {article.title}
          </Text>
          <View style={styles.subInfoContainer}>
            <Text numberOfLines={1} style={styles.source}>
              {article.rights !== null ? article.rights : article.author}
            </Text>
            <Text style={styles.date}>
              {new Date(article.published_date).toLocaleDateString('en-US')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  elevation,

  buttonContainer: {
    backgroundColor: '#fff',
    height: 100,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 18,
    // borderColor: 'red',
    // borderWidth: 1,
  },

  container: {
    // backgroundColor: '#fff',
    height: '100%',
    padding: 8,
    paddingTop: 15,
    borderRadius: 15,
    flexDirection: 'row',
    // borderBottomColor: '#fff',
    borderBottomWidth: 6,
  },

  activeCard: {
    // backgroundColor: '#A5daff',
    borderBottomColor: '#A5daff',
  },

  imageContainer: {
    width: 100,
    height: '100%',
    borderRadius: 10,
    // backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },

  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    // height: '100%',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  source: {
    fontSize: 13,
    flex: 2,
  },

  date: {
    fontSize: 12,
    flex: 2,
    textAlign: 'right',
  },
});
