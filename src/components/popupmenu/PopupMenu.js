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
        <Icon
          name="ellipsis-vertical"
          size={20}
          // style={{paddingHorizontal: 10, paddingVertical: 5}}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            width: 200,
          },
        }}>
        <PopupMenuItem
          text="FAQs"
          iconName="ios-help-circle-outline"
          route="Demo"
        />
        <Divider />
        <PopupMenuItem
          text="About us"
          iconName="ios-information-circle-outline"
          route="Demo"
        />
        <Divider />
        <PopupMenuItem
          text="Alan Walkthrough"
          iconName="ios-layers-outline"
          route="AlanWalkthrough"
        />
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
