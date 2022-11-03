import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useStore} from '../../store/Store';
import {Categories} from './Categories';
import {CategoryItem} from './CategoryItem';

export const CategoryList = ({fetchNewsData}) => {
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

    let paramObj;

    if (activeCategory.header === 'all') {
      paramObj = {
        when: '24h',
      };
    } else {
      paramObj = {
        when: '24h',
        topic: `${activeCategory.header}`,
      };
    }

    let url = '/latest_headlines';
    fetchNewsData(url, paramObj);
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
      style={styles.categoryList}
      KeyExtrator={keyExtractor}
      data={Categories}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={activeCategoryId}
      getItemLayout={(_, index) => ({
        length: 75 + 30, //  WIDTH + (MARGIN_HORIZONTAL * 2)
        offset: (75 + 30) * (index - 1), //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index-1)
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  categoryList: {
    height: '22.5%',
    flexGrow: 0,
    // backgroundColor: '#fff',
  },
});
