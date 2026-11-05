import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const FOOD_EMOJIS = [
  '🍕', '🍔', '🍣', '🍜', '🍱', '🥗',
  '🍝', '🥘', '🍲', '🍛', '🥩', '🍗',
  '🍤', '🍰', '🍩', '🍪', '🧁', '🍦',
  '🍷', '🍹', '☕', '🍺', '🥐', '🥪',
];

export default function Slideshow({ size = 80, interval = 700 }) {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      // Fade out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex((prev) => (prev + 1) % FOOD_EMOJIS.length);
        // Fade in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, interval);

    return () => clearInterval(timer);
  }, [fadeAnim, scaleAnim, interval]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.emoji,
          {
            fontSize: size,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {FOOD_EMOJIS[index]}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  emoji: {
    textAlign: 'center',
  },
});