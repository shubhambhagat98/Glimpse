import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {elevation} from '../../styles/styles';

export const CategoryItem = ({
  header,
  imageSource,
  id,
  active,
  handlePress,
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.container,
          elevation,
          id === 0 ? {marginLeft: 25, marginRight: 15} : {marginRight: 15},
          active ? {backgroundColor: '#A5daff'} : {backgroundColor: '#fff'},
        ]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={`${imageSource}`} />
        </View>
        <Text numberOfLines={1} style={styles.header}>
          {header}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 15,
    // marginHorizontal: 25,
  },
  elevation,
  image: {
    width: 35,
    height: 35,
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  header: {
    fontWeight: 'bold',
  },
});
