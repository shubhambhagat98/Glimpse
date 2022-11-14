import {StyleSheet, View, Animated, useWindowDimensions} from 'react-native';
import React from 'react';

export const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={idx.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    marginVertical: 20,
    // borderWidth: 1,
    // borderColor: 'yellow',
  },

  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#005693',
    marginHorizontal: 8,
  },
});
