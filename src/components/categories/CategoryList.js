import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useStore} from '../../store/Store';
import {Categories} from './Categories';
import {CategoryItem} from './CategoryItem';

export const CategoryList = () => {
  const activeCategory = useStore(state => state.activeCategory);
  const setActiveCategory = useStore(state => state.setActiveCategory);
  const setKeyword = useStore(state => state.setKeyword);

  const activeCategoryId = activeCategory.id;

  const handlePress = id => {
    let activeCategory = {
      id: id,
      header: Categories[id].header.toLowerCase(),
    };
    setActiveCategory(activeCategory);
    setKeyword('');
  };

  const renderItem = ({item: {id, header, imageSource}}) => {
    return (
      <CategoryItem
        header={header}
        imageSource={imageSource}
        id={id}
        active={id === activeCategoryId}
        handlePress={() => handlePress(id)}
      />
    );
  };

  const keyExtractor = item => item.id.toString();

  return (
    <FlatList
      style={{flexGrow: 0}}
      KeyExtrator={keyExtractor}
      data={Categories}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});
