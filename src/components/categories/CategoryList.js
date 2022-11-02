import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useStore} from '../../store/Store';
import {Categories} from './Categories';
import {CategoryItem} from './CategoryItem';

export const CategoryList = () => {
  const activeCategory = useStore(state => state.activeCategory);
  const setActiveCategory = useStore(state => state.setActiveCategory);
  const setKeyword = useStore(state => state.setKeyword);

  const categoryListRef = useRef(null);

  const activeCategoryId = activeCategory.id;

  useEffect(() => {
    scrollToIndex(activeCategoryId);
  }, [activeCategoryId]);

  const scrollToIndex = index => {
    categoryListRef.current.scrollToIndex({
      index: index,
      viewPosition: 0.4,
    });
  };

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
      ref={categoryListRef}
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
