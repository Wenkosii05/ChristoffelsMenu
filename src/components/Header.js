import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../utils/colors';

export default function Header({ title, showBack = false, rightComponent }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    paddingRight: 12,
    paddingVertical: 8,
  },
  backIcon: {
    fontSize: 34,
    fontWeight: '300',
    color: COLORS.white,
    lineHeight: 34,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});