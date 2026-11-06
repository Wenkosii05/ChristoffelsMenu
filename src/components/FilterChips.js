import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../utils/colors';

export default function FilterChips({ selected, onSelect, categories = [] }) {
  const allFilters = ['All', ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {allFilters.map((filter) => {
        const isActive = selected === filter;
        const chipColor = filter === 'All' ? COLORS.primary : CATEGORY_COLORS[filter] || COLORS.primary;

        return (
          <TouchableOpacity
            key={filter}
            onPress={() => onSelect(filter)}
            activeOpacity={0.7}
            style={[
              styles.chip,
              isActive
                ? { backgroundColor: chipColor, borderColor: chipColor }
                : { backgroundColor: COLORS.white, borderColor: COLORS.border },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: isActive ? COLORS.white : COLORS.textSecondary },
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    minHeight: 36,
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});