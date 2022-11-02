import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {elevation} from '../../styles/styles';
import {useStore} from '../../store/Store';
import {Categories} from '../categories/Categories';
import {Sources} from './Sources';

const initialCategory = {
  id: 0,
  header: 'all',
};

const getMatchedCategory = input => {
  return (
    Categories.find(c => c.header.toLowerCase() === input.toLowerCase()) || null
  );
};

const getSourceIndex = input => {
  const newInput = input.toLowerCase().replace(/ /g, '');
  return Sources.findIndex(s => s.toLowerCase().split('.')[0] === newInput);
};

const getMatchedSource = input => {
  const index = getSourceIndex(input);
  if (index === -1) {
    return null;
  } else {
    return Sources[index];
  }
};

export const Search = () => {
  const keyword = useStore(state => state.keyword);
  const setKeyword = useStore(state => state.setKeyword);
  const setActiveCategory = useStore(state => state.setActiveCategory);

  const inputRef = useRef();

  const searchNewshandler = () => {
    if (!keyword) {
      console.log('do nothing');
      return;
    }

    inputRef.current.clear();

    const matchedCategory = getMatchedCategory(keyword);
    if (matchedCategory !== null) {
      setActiveCategory({
        id: matchedCategory.id,
        header: matchedCategory.header,
      });
      console.log('search by category'); // search by category
    } else {
      const matchedSource = getMatchedSource(keyword);

      if (matchedSource !== null) {
        setActiveCategory(initialCategory);
        console.log('Macthed Sources: ', matchedSource);
        console.log('search by source'); // search by source
      } else {
        console.log('search by keyword'); //search by keyword
        setActiveCategory(initialCategory);
      }
    }
  };

  return (
    <View style={[styles.container, styles.elevation]}>
      <TextInput
        ref={inputRef}
        autoCorrect={false}
        style={styles.input}
        placeholder="Keywords..."
        onChangeText={text => {
          setKeyword(text);
        }}
        onEndEditing={searchNewshandler}
        value={keyword}
      />
      <Icon onPress={searchNewshandler} name="search" size={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 25, //20
    padding: 15,
    justifyContent: 'space-between',
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
