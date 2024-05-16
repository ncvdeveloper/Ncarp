import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';

const DrawerSceneWrapper = ({ children }) => {
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.85], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [1, 0.9], 'clamp'),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 30], 'clamp'),
    overflow: 'hidden',
    height: interpolate(progress.value, [0, 1], ['70%', '80%'], 'clamp'),
  }));

  const stackStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.9]),
    borderRadius: 30,
    overflow: 'hidden',
    transform: [
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.99], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [0.8, 0.8], 'clamp'),
      },
    ],
  }));
  //   const stackStyle = useAnimatedStyle(() => ({
  //     opacity: interpolate(progress.value, [0, 1], [0, 1]),
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //     borderBottomLeftRadius: interpolate(
  //       progress.value,
  //       [0, 1],
  //       [20, 0],
  //       'clamp'
  //     ),
  //     borderBottomRightRadius: interpolate(
  //       progress.value,
  //       [0, 1],
  //       [20, 0],
  //       'clamp'
  //     ),
  //     height: interpolate(progress.value, [0, 1], ['110%', '100%'], 'clamp'),
  //     borderColor: 'gray', // Adjust the border color as needed
  //     borderWidth: 1,
  //   }));

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.childrenContainer, animatedStyle]}>
        {children}
      </Animated.View>

      <Animated.View style={[styles.stack, stackStyle]} />
    </View>
  );
};

export default DrawerSceneWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff', // Adjust the background color as needed
    zIndex: 0,
    right: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 3,
    width: '100%',
  },
  childrenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10
  },
});