import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';

import {setAlanVisualState, sendArticleIndexToAlan} from '../utils/AlanUtility';
import {openArticleWebView} from '../utils/NavigationUtility';
import {useFocusEffect} from '@react-navigation/native';

import {Divider} from '../components/popupmenu/Divider';
import {BackButton} from '../components/buttons/BackButton';
import {MenuButton} from '../components/buttons/MenuButton';

const NEWS_IMAGE = require('../assets/images/news-demo.png');

export const ArticleDetails = ({
  navigation,
  route: {
    params: {index, article},
  },
}) => {
  useEffect(() => {
    setAlanVisualState('ArticleDetailScreen');
    sendArticleIndexToAlan(index);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <MenuButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImageBackground source={NEWS_IMAGE} resizeMode="cover">
            <Image
              source={{
                uri:
                  article.media ||
                  'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png',
              }}
              style={styles.image}
            />
            <View style={styles.overlayView} />
          </ImageBackground>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>{article.title}</Text>
          </View>
          <View style={styles.subInfoContainer}>
            <Text numberOfLines={1} style={styles.author}>
              By: {article.author}
            </Text>
            <Text style={styles.date}>
              {new Date(article.published_date).toLocaleDateString('en-US')}
            </Text>
          </View>
          <Divider />
          <View>
            <Text style={styles.summary}>{article.summary}</Text>
          </View>
          <View>
            <Text style={styles.author}>
              Source:{' '}
              {article.rights !== null ? article.rights : article.author}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.openbutton}
            onPress={() => openArticleWebView(index, article)}>
            <Text style={styles.buttonText}>Open webpage</Text>
          </TouchableOpacity>
        </View>

        <StatusBar hidden />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfe',
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },

  image: {
    width: '100%',
    height: '100%',
    // borderRadius: 10,
    resizeMode: 'cover',
  },
  overlayView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  infoContainer: {
    backgroundColor: '#fbfbfe',
    // marginTop: -30,
    marginBottom: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  subInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  summary: {
    marginVertical: 15,
    fontSize: 15,
    lineHeight: 20,
  },

  openbutton: {
    alignSelf: 'center',
    marginVertical: 30,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#005693',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
