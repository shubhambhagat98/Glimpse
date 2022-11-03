import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {NativeModules} from 'react-native';
const {AlanManager} = NativeModules;

export const ArticleDetails = ({
  navigation: {navigate, goBack},
  route: {params},
}) => {
  useEffect(() => {
    setVisualState();
    sendArticleIndexToAlan(params.index);
  }, []);

  const setVisualState = () => {
    console.log('inside set visual state');
    AlanManager.setVisualState({screen: 'ArticleDetailScreen'});
  };

  const sendArticleIndexToAlan = index => {
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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile details</Text>
      <Text>data: {params.article.title}</Text>
      <Text>number: {params.index}</Text>
      <Button
        title="Go back"
        onPress={() =>
          // navigate('Home', {
          //   article: 'data from article details page',
          // })
          goBack()
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});
