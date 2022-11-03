import React, {useState} from 'react';
import {useEffect} from 'react';
import WebView from 'react-native-webview';
import {NativeModules, ActivityIndicator, StyleSheet, View} from 'react-native';
const {AlanManager} = NativeModules;

export const ArticleWebView = ({
  navigation: {navigate, goBack},
  route: {params},
}) => {
  const [link] = useState(params.article.link);

  useEffect(() => {
    setVisualState();
  }, []);

  const setVisualState = () => {
    // console.log('inside set visual state');
    AlanManager.setVisualState({screen: 'ArticleWebViewScreen'});
  };

  const LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
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
        onShouldStartLoadWithRequest={request => {
          if (request.url === link) {
            return true;
          }
          return false;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
