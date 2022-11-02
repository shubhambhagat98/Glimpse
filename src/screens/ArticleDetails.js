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
  }, []);

  const setVisualState = () => {
    console.log('inside set visual state');
    AlanManager.setVisualState({screen: 'ArticleDetailscreen'});
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile details</Text>
      <Text>data: {params.article.title}</Text>
      <Text>number: {params.number}</Text>
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
