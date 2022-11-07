import {View, StyleSheet} from 'react-native';
import React from 'react';

export const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#7F8487',
  },
});
