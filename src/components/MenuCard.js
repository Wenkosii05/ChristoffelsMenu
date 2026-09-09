import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../utils/colors';

export default function MenuCard({ item, onPress }) {
  const categoryColor = CATEGORY_COLORS[item.course] || COLORS.textLight;
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.dishName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.metaRow}>
            <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
              <Text style={styles.categoryText}>{item.course}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    marginRight: 12,
  },
  dishName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.white,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
});