import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { deleteMenuItem } from '../utils/storage';
import { formatPrice, formatDate } from '../utils/validators';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

export default function DishDetailsScreen({ route, navigation }) {
  const { dish } = route.params;
  const categoryColor = CATEGORY_COLORS[dish.course] || COLORS.textLight;
  const isAvailable = dish.available !== false;

  const handleEdit = () => navigation.navigate('EditDish', { dish });

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Delete Dish',
      `Are you sure you want to delete "${dish.name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMenuItem(dish.id);
              Alert.alert(
                '✅ Deleted',
                `"${dish.name}" has been removed from the menu.`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
              );
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
      <Header
        title="Dish Details"
        showBack={true}
        rightComponent={
          <TouchableOpacity onPress={handleEdit} style={styles.editIcon}>
            <Text style={styles.editIconText}>✏️</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageIcon}>🍽️</Text>
          <Text style={styles.imageText}>{dish.course}</Text>
        </View>

        <Text style={styles.dishName}>{dish.name}</Text>

        <View style={styles.metaRow}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{dish.course}</Text>
          </View>
          <Text style={styles.price}>{formatPrice(dish.price)}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: isAvailable ? COLORS.successLight : COLORS.dangerLight },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: isAvailable ? COLORS.success : COLORS.danger },
            ]}
          >
            {isAvailable ? '✅ Available' : '⚠️ Unavailable'}
          </Text>
        </View>

        <View style={globalStyles.divider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {dish.description || 'No description provided.'}
        </Text>

        <View style={globalStyles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Added:</Text>
          <Text style={styles.detailValue}>{formatDate(dish.createdAt)}</Text>
        </View>

        {dish.updatedAt && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last updated:</Text>
            <Text style={styles.detailValue}>{formatDate(dish.updatedAt)}</Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <CustomButton
            title="Edit Dish"
            type="primary"
            onPress={handleEdit}
            style={styles.halfButton}
          />
          <CustomButton
            title="Delete"
            type="danger"
            onPress={handleDelete}
            style={styles.halfButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  editIcon: { padding: 6 },
  editIconText: { fontSize: 20 },
  imagePlaceholder: {
    backgroundColor: COLORS.border,
    borderRadius: 12,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageIcon: { fontSize: 48 },
  imageText: { fontSize: 14, color: COLORS.textLight, marginTop: 8 },
  dishName: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  categoryText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  price: { fontSize: 20, fontWeight: '700', color: COLORS.primary },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusText: { fontSize: 13, fontWeight: '600' },
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
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    width: 120,
  },
  detailValue: { fontSize: 14, color: COLORS.textSecondary },
  buttonRow: { flexDirection: 'row', marginTop: 24 },
  halfButton: { flex: 1, marginHorizontal: 4 },
});