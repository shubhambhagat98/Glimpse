import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {PopupMenu} from '../popupmenu/PopupMenu';
import * as Rootnavigation from '../../utils/RootNavigation';
import {elevation} from '../../styles/styles';
export const MenuButton = () => {
  return (
    <TouchableOpacity
      style={[styles.imageContainer, elevation]}
      onPress={() => {
        Rootnavigation.goBack();
      }}>
      <PopupMenu name="popup-menu1" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    top: 30,
    right: 20,
    position: 'absolute',
    marginTop: 15,
    padding: 5,
    backgroundColor: '#fbfbfe',
    borderRadius: 40,
    zIndex: 10,
  },
});
