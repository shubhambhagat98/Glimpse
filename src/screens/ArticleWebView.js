import React, {useState} from 'react';
import {useEffect} from 'react';
import WebView from 'react-native-webview';
import {setAlanVisualState} from '../utils/AlanUtility';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PopupMenu} from '../components/popupmenu/PopupMenu';
export const ArticleWebView = ({navigation, route: {params}}) => {
  useEffect(() => {
    setAlanVisualState('ArticleWebViewScreen');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: 'Web View',
        headerRight: () => <PopupMenu name="popup-menu2" />,
        headerLeft: () => (
          <Icon
            name="ios-chevron-back"
            size={26}
            onPress={() => {
              navigation.goBack();
            }}
            color="#222"
          />
        ),
      });
    }, [navigation]),
  );

  const ActivityIndicatorElement = () => {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: params.article.link}}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={true}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicatorElement />}
        onShouldStartLoadWithRequest={request => {
          return true;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  activityIndicatorStyle: {
    // flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
