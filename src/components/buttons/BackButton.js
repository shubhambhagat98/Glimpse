import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Rootnavigation from '../../utils/RootNavigation';
import {elevation} from '../../styles/styles';
export const BackButton = () => {
  return (
    <TouchableOpacity
      style={[styles.imageContainer, elevation]}
      onPress={() => {
        Rootnavigation.goBack();
      }}>
      <Icon name="ios-chevron-back" size={24} color="#222" style={{left: -1}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    top: 30,
    left: 20,
    position: 'absolute',
    marginTop: 15,
    padding: 5,
    backgroundColor: '#fbfbfe',
    borderRadius: 40,
    zIndex: 10,
    alignItems: 'flex-start',
  },
});
