import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {PopupMenu} from '../components/popupmenu/PopupMenu';
import {setAlanVisualState, sendArticleIndexToAlan} from '../utils/AlanUtility';
import {openArticleWebView} from '../utils/NavigationUtility';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from '../components/popupmenu/Divider';
import {BackButton} from '../components/buttons/BackButton';
import {MenuButton} from '../components/buttons/MenuButton';
const NEWS_IMAGE = {
  uri: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png',
};

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
      <ScrollView>
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
          <Button
            title="web view"
            onPress={() => openArticleWebView(index, article)}
          />
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
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
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
});
