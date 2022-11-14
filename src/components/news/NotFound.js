import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export const NotFound = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/not-found.png')}
        />
      </View>

      <Text style={styles.text}>Could not find news articles!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 40,
  },

  imageWrapper: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    padding: 15,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  text: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },
});
