import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {elevation} from '../../styles/styles';
import {useStore} from '../../store/Store';
import {Categories} from '../categories/Categories';

const initialCategory = {
  id: 0,
  header: 'all',
};

const getMatchedCategory = input => {
  return (
    Categories.find(c => c.header.toLowerCase() === input.toLowerCase()) || null
  );
};

export const Search = () => {
  const keyword = useStore(state => state.keyword);
  const setKeyword = useStore(state => state.setKeyword);
  const setActiveCategory = useStore(state => state.setActiveCategory);

  const setKeywordInStore = () => {
    const matchedCategory = getMatchedCategory(keyword);
    if (matchedCategory === null) {
      setActiveCategory(initialCategory);
    } else {
      setActiveCategory({
        id: matchedCategory.id,
        header: matchedCategory.header,
      });
    }
  };

  return (
    <View style={[styles.container, styles.elevation]}>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        placeholder="Keywords..."
        onChangeText={text => {
          setKeyword(text);
        }}
        onEndEditing={setKeywordInStore}
        value={keyword}
      />
      <Icon onPress={setKeywordInStore} name="search" size={25} />
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
