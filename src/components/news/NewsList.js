import React, {forwardRef, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {NewsCard} from './NewsCard';
import {NewsHeader} from './NewsHeader';

export const NewsList = ({newsList, activeArticle, isAlanReading}) => {
  const newListRef = useRef(null);

  const renderItem = ({item, index}) => {
    return (
      <NewsCard
        article={item}
        index={index}
        activeArticle={activeArticle}
        isAlanReading={isAlanReading}
      />
    );
  };

  useEffect(() => {
    // console.log('activeArticle => ', activeArticle);

    if (newsList.length !== 0) {
      if (activeArticle === -1) {
        scrollToIndex(0);
      } else {
        scrollToIndex(activeArticle);
      }
    }
  }, [activeArticle, newsList]);

  const scrollToIndex = index => {
    newListRef.current.scrollToIndex({
      index: index,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<NewsHeader />}
        ref={newListRef}
        data={newsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={0}
        getItemLayout={(_, index) => ({
          length: 100 + 20, //  HEIGHT + (MARGIN_VERTICAL * 2)
          offset: (100 + 20) * index, //  ( HEIGHT + (MARGIN_VERTICAL*2) ) * (index-1)
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 15,
    // marginHorizontal: 25,
    flex: 1,
  },
});
