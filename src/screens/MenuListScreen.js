import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, CATEGORIES } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { getMenuItems } from '../utils/storage';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/Searchbar';
import FilterChips from '../components/FilterChips';
import StatsBanner from '../components/StatsBanner';

export default function MenuListScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading menu items:', error);
      Alert.alert('Error', 'Failed to load menu items.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMenuItems();
    }, [])
  );

  // Filtered items based on search + course filter
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchesFilter =
        selectedFilter === 'All' || item.course === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [menuItems, searchQuery, selectedFilter]);

  // Live statistics
  const stats = useMemo(() => {
    if (menuItems.length === 0) {
      return { totalItems: 0, averagePrice: 0 };
    }
    const total = menuItems.reduce((sum, item) => sum + (item.price || 0), 0);
    return {
      totalItems: menuItems.length,
      averagePrice: total / menuItems.length,
    };
  }, [menuItems]);

  const handleAddPress = () => navigation.navigate('AddDish');
  const handleDishPress = (item) => navigation.navigate('DishDetails', { dish: item });
  const handleStatsPress = () => navigation.navigate('Stats');

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedFilter('All');
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedFilter !== 'All';

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <Header title="Christoffel's Menu" />
        <View style={globalStyles.emptyState}>
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header
        title="Christoffel's Menu"
        rightComponent={
          <TouchableOpacity onPress={handleStatsPress} style={styles.statsButton}>
            <Text style={styles.statsIcon}>📊</Text>
          </TouchableOpacity>
        }
      />

      <StatsBanner
        totalItems={stats.totalItems}
        averagePrice={stats.averagePrice}
        onPress={handleStatsPress}
      />

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <FilterChips
        selected={selectedFilter}
        onSelect={setSelectedFilter}
        categories={CATEGORIES}
      />

      {hasActiveFilters && (
        <View style={styles.filterInfo}>
          <Text style={styles.filterInfoText}>
            {filteredItems.length}{' '}
            {filteredItems.length === 1 ? 'result' : 'results'}
            {selectedFilter !== 'All' && ` in ${selectedFilter}`}
            {searchQuery.trim() && ` matching "${searchQuery}"`}
          </Text>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      {filteredItems.length === 0 ? (
        menuItems.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No Menu Items Yet"
            message="Tap the + button below to add your first dish!"
          />
        ) : (
          <EmptyState
            icon="🔍"
            title="No Matches Found"
            message="Try a different search or clear your filters."
          />
        )
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuCard item={item} onPress={() => handleDishPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={globalStyles.fab}
        onPress={handleAddPress}
        activeOpacity={0.85}
      >
        <Text style={globalStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
    paddingTop: 4,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  statsButton: {
    padding: 6,
  },
  statsIcon: {
    fontSize: 22,
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  filterInfoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  clearText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
});