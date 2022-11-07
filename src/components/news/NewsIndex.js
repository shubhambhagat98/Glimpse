import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

export const NewsIndex = ({index}) => {
  return (
    <View style={styles.indexContainer}>
      <Text style={styles.index}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  index: {
    fontSize: 11,
  },

  indexContainer: {
    width: 15,
    height: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
    position: 'absolute',
    bottom: 0,
    left: 5,
    // borderColor: '#ececec',
    // borderWidth: 0.2,
  },
});
