import {MenuOption} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import React from 'react';
import * as RootNavigation from '../../utils/RootNavigation';

export const PopupMenuItem = ({text, iconName, route}) => {
  return (
    <MenuOption
      onSelect={() => {
        route === 'Demo'
          ? alert('demo')
          : RootNavigation.navigate(route, {
              notInitialWalkthrough: true,
            });
      }}
      customStyles={{
        optionWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        },
      }}>
      <Text style={{fontSize: 15}}>{text}</Text>
      <Icon name={iconName} size={22} />
    </MenuOption>
  );
};
