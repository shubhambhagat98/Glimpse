import {MenuOption} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import React from 'react';

export const PopupMenuItem = ({text, iconName}) => {
  return (
    <MenuOption
      onSelect={() => alert(`You clicked ${text}`)}
      customStyles={{
        optionWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }}>
      <Text style={{fontSize: 15}}>{text}</Text>
      <Icon name={iconName} size={22} />
    </MenuOption>
  );
};
