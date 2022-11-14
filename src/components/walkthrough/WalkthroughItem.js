import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';

export const WalkthroughItem = ({title, info, intent, example}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      {/* <Image source={imageSource} style={[styles.image]} /> */}
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{title}</Text>

        <View>
          {intent === 'search' && (
            <Text style={styles.subtitle}>Some relevant options:</Text>
          )}
          <Text style={styles.info}>{info}</Text>
        </View>

        <View>
          <Text style={styles.subtitle}>Example voice query:</Text>
          {example.map((query, idx) => (
            <Text key={idx} style={styles.query}>
              {query}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoWrapper: {
    flex: 1,
    // borderColor: 'blue',
    // borderWidth: 1,
    justifyContent: 'space-evenly',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#005693',
    textAlign: 'center',
  },

  info: {
    fontWeight: '300',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 50,
    marginBottom: 15,
  },

  subtitle: {
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 64,
    marginBottom: 20,
    fontSize: 15,
  },

  query: {
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 15,
    fontSize: 18,
    fontStyle: 'italic',
  },
});
