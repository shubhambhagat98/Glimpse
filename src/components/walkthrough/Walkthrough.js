import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Slides} from './Slides';
import {WalkthroughItem} from './WalkthroughItem';
import {Paginator} from './Paginator';
import {NextButton} from './NextButton';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PopupMenu} from '../../components/popupmenu/PopupMenu';

import {setAlanVisualState} from '../../utils/AlanUtility';

export const Walkthrough = ({navigation, route: {params}}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      params && params.notInitialWalkthrough
        ? navigation.setOptions({
            title: 'Alan Walkthrough',
            headerRight: () => <PopupMenu name="popup-menu2" />,
            headerLeft: () => (
              <Icon
                name="ios-chevron-back"
                size={26}
                onPress={() => {
                  navigation.goBack();
                }}
                color="#222"
              />
            ),
          })
        : navigation.setOptions({
            title: 'Alan Walkthrough',
          });
    }, [navigation]),
  );

  useEffect(() => {
    setAlanVisualState('AlanWalkthrough');
  }, []);

  const renderItem = ({item}) => {
    return <WalkthroughItem {...item} />;
  };

  const keyExtractor = item => item.id.toString();

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < Slides.length - 1) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      console.log('last item');
    }
  };

  const navigateToHome = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <FlatList
          data={Slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={keyExtractor}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator data={Slides} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / Slides.length)}
        scrollTo={scrollTo}
        navigateToHome={navigateToHome}
        notInitialWalkthrough={
          params && params.notInitialWalkthrough ? true : false
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  listWrapper: {
    flex: 2,
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
