import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const imageSource = require('../../assets/images/audio.gif');

export const AudioImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image source={`${imageSource}`} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '60%',
    height: '60%',
    borderRadius: 5,
  },

  imageContainer: {
    width: 30,
    height: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
    position: 'absolute',
    bottom: 0,
    left: 5,
  },
});
