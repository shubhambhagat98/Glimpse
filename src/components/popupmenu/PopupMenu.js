import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {PopupMenuItem} from './PopupMenuItem';
import {Divider} from './Divider';

export const PopupMenu = ({menuName}) => {
  return (
    <Menu name={menuName}>
      <MenuTrigger>
        <Icon name="ellipsis-vertical" size={20} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            width: 175,
          },
        }}>
        <PopupMenuItem text="FAQs" iconName="ios-help-circle-outline" />
        <Divider />
        <PopupMenuItem
          text="About us"
          iconName="ios-information-circle-outline"
        />
        <Divider />
        <PopupMenuItem text="Alan Walkthrough" iconName="ios-layers-outline" />
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
