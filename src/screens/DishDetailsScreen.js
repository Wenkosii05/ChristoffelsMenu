import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { deleteMenuItem } from '../utils/storage';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

export default function DishDetailsScreen({ route, navigation }) {
  const { dish } = route.params;

  const categoryColor = CATEGORY_COLORS[dish.course] || COLORS.textLight;

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Delete Dish',
      `Are you sure you want to delete "${dish.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMenuItem(dish.id);
              Alert.alert('✅ Deleted', `"${dish.name}" has been removed.`);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the dish. Please try again.');
              console.error('Delete error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header title="Dish Details" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageIcon}>🍽️</Text>
          <Text style={styles.imageText}>{dish.course}</Text>
        </View>
        
        <Text style={styles.dishName}>{dish.name}</Text>
        
        <View style={styles.metaRow}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{dish.course}</Text>
          </View>
          <Text style={styles.price}>R {dish.price.toFixed(2)}</Text>
        </View>
        
        <View style={globalStyles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{dish.description || 'No description provided.'}</Text>
        
        <View style={globalStyles.divider} />
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Added:</Text>
          <Text style={styles.detailValue}>
            {dish.createdAt ? new Date(dish.createdAt).toLocaleDateString() : 'Unknown'}
          </Text>
        </View>
        
        <View style={styles.buttonRow}>
          <CustomButton
            title="Delete Dish"
            type="danger"
            onPress={handleDelete}
            style={styles.deleteButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.border,
    borderRadius: 12,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageIcon: {
    fontSize: 48,
  },
  imageText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  dishName: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    width: 130,
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  buttonRow: {
    marginTop: 24,
  },
  deleteButton: {
    width: '100%',
  },
});