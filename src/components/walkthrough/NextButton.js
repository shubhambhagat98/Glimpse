import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Svg, G, Circle} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePersistStore} from '../../store/PersistStore';
import * as RootNavigation from '../../utils/RootNavigation';

export const NextButton = ({
  percentage,
  scrollTo,
  navigateToHome,
  notInitialWalkthrough,
}) => {
  const setIsOnboardingDone = usePersistStore(
    state => state.setIsOnboardingDone,
  );

  const finishWalkthrough = () => {
    if (notInitialWalkthrough) {
      RootNavigation.goBack();
    } else {
      setIsOnboardingDone(true);
      navigateToHome();
    }
  };

  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={percentage === 100 ? '#54a862' : '#f5459a'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={percentage === 100 ? finishWalkthrough : scrollTo}
        style={[
          styles.button,
          {backgroundColor: percentage === 100 ? '#54a862' : '#f5459a'},
        ]}>
        {percentage === 100 ? (
          <Icon name="checkmark" size={32} color="#fff" />
        ) : (
          <Icon name="arrow-forward" size={32} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'green',
  },

  button: {
    position: 'absolute',
    borderRadius: 100,
    padding: 20,
  },
});
