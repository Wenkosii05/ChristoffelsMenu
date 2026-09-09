import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MenuList');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🍽️</Text>
        <Text style={styles.title}>Christoffel's</Text>
        <Text style={styles.subtitle}>Restaurant</Text>
        <Text style={styles.tagline}>Menu Manager</Text>
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
      </View>
      <Text style={styles.version}>Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 8,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  spinner: {
    marginTop: 32,
  },
  version: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 20,
  },
});