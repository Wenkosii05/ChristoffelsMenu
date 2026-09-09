import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

export default function EmptyState({ icon, title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon || '🍽️'}</Text>
      <Text style={styles.title}>{title || 'No Menu Items'}</Text>
      <Text style={styles.message}>
        {message || 'Start adding your delicious dishes!'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});