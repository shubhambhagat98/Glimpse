import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../../store/Store';

export const NewsHeader = () => {
  const [headerText, setHeaderText] = useState('');
  const intent = useStore(state => state.intent);
  const keyword = useStore(state => state.keyword);
  const activeCategory = useStore(state => state.activeCategory);

  useEffect(() => {
    generateHeaderText();
  }, [intent, activeCategory]);

  useEffect(() => {}, [headerText]);

  const generateHeaderText = () => {
    if (intent === 'defaultSearch') {
      setHeaderText('Latest headlines');
    } else if (intent === 'searchBySource') {
      setHeaderText(`News from ${keyword}`);
    } else if (intent === 'searchByCategory') {
      setHeaderText(`News about ${activeCategory.header}`);
    } else {
      setHeaderText(`News about ${keyword}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    marginHorizontal: 25,
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
    // paddingBottom: 10,
  },
});
