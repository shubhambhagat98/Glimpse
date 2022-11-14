import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useRef, forwardRef, useEffect} from 'react';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import {Keyboard} from 'react-native';
import {elevation} from '../../styles/styles';
import {useStore} from '../../store/Store';

import {
  initialCategory,
  getMatchedCategory,
  getMatchedSource,
} from '../../utils/FilterUtility';

export const Search = forwardRef(({fetchNewsData}, ref) => {
  const keyword = useStore(state => state.keyword);
  const setKeyword = useStore(state => state.setKeyword);
  const setActiveCategory = useStore(state => state.setActiveCategory);
  const setIntent = useStore(state => state.setIntent);

  const searchNewshandler = () => {
    if (!keyword) {
      console.log('do nothing');
      return;
    }

    const matchedCategory = getMatchedCategory(keyword);
    if (matchedCategory !== null) {
      setActiveCategory({
        id: matchedCategory.id,
        header: matchedCategory.header,
      });
      // console.log('search by category'); // search by category

      let paramObj;
      if (matchedCategory.header.toLowerCase() === 'all') {
        paramObj = {
          when: '24h',
        };
        setIntent('defaultSearch');
      } else {
        paramObj = {
          when: '24h',
          topic: `${matchedCategory.header.toLowerCase()}`,
        };
        setIntent('searchByCategory');
      }

      let url = '/latest_headlines';
      fetchNewsData(url, paramObj);
    } else {
      const matchedSource = getMatchedSource(keyword);

      if (matchedSource !== null) {
        setActiveCategory(initialCategory);

        // console.log('Macthed Sources: ', matchedSource);
        // console.log('search by source'); // search by source
        let paramObj = {
          when: '24h',
          sources: `${matchedSource}`,
        };
        let url = '/latest_headlines';
        setIntent('searchBySource');
        // setKeyword(matchedSource);
        fetchNewsData(url, paramObj);
      } else {
        setActiveCategory(initialCategory);
        let paramObj = {
          q: `"${keyword}"`,
        };
        let url = '/search';
        setIntent('searchByKeyword');
        fetchNewsData(url, paramObj);
      }
    }

    // console.log('clearing input');
    ref.current.clear();
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, styles.elevation]}>
      <TextInput
        ref={ref}
        autoCorrect={false}
        style={styles.input}
        placeholder="Keywords..."
        placeholderTextColor="#bbb"
        onChangeText={text => {
          setKeyword(text);
        }}
        onEndEditing={searchNewshandler}
        value={keyword}
      />
      <SearchIcon onPress={searchNewshandler} name="search" size={25} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 25, //20
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#fff',
  },

  elevation,

  input: {
    fontSize: 20,
    width: '90%',
    paddingLeft: 5,
  },
});
