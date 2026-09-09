import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { getMenuItems } from '../utils/storage';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import EmptyState from '../components/EmptyState';

export default function MenuListScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddPress = () => {
    navigation.navigate('AddDish');
  };

  const handleDishPress = (item) => {
    navigation.navigate('DishDetails', { dish: item });
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <Header title="Christoffel's Menu" />
        <View style={[globalStyles.emptyState]}>
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header title="Christoffel's Menu" />
      
      {menuItems.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No Menu Items Yet"
          message="Tap the + button below to add your first dish!"
        />
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuCard item={item} onPress={() => handleDishPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={globalStyles.fab} onPress={handleAddPress}>
        <Text style={globalStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
    paddingTop: 8,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});