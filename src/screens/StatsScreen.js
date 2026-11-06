import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, CATEGORIES, CATEGORY_COLORS } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { getMenuStatistics } from '../utils/storage';
import { formatPrice } from '../utils/validators';
import Header from '../components/Header';

export default function StatsScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getMenuStatistics();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  if (loading || !stats) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <Header title="Menu Statistics" showBack={true} />
        <View style={globalStyles.emptyState}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Calculating statistics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isEmpty = stats.totalItems === 0;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header title="Menu Statistics" showBack={true} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>📊</Text>
            <Text style={styles.emptyTitle}>No Data Yet</Text>
            <Text style={styles.emptyText}>
              Add some menu items to see statistics here.
            </Text>
          </View>
        ) : (
          <>
            {/* Top-level summary cards */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryEmoji}>🍽️</Text>
                <Text style={styles.summaryValue}>{stats.totalItems}</Text>
                <Text style={styles.summaryLabel}>Total Items</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryEmoji}>💰</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(stats.averagePrice)}
                </Text>
                <Text style={styles.summaryLabel}>Average Price</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryEmoji}>💵</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(stats.totalValue)}
                </Text>
                <Text style={styles.summaryLabel}>Total Menu Value</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryEmoji}>
                  {stats.unavailableCount > 0 ? '⚠️' : '✅'}
                </Text>
                <Text style={styles.summaryValue}>{stats.unavailableCount}</Text>
                <Text style={styles.summaryLabel}>Unavailable</Text>
              </View>
            </View>

            {/* Per-course breakdown */}
            <Text style={styles.sectionTitle}>Items by Course</Text>

            {CATEGORIES.map((course) => {
              const total = stats.byCourse[course] || 0;
              const available = stats.availableByCourse[course] || 0;
              const percentage =
                stats.totalItems > 0
                  ? Math.round((total / stats.totalItems) * 100)
                  : 0;
              const color = CATEGORY_COLORS[course] || COLORS.primary;

              return (
                <View key={course} style={styles.courseCard}>
                  <View style={styles.courseHeader}>
                    <View style={[styles.dot, { backgroundColor: color }]} />
                    <Text style={styles.courseName}>{course}</Text>
                    <Text style={styles.courseCount}>
                      {total} {total === 1 ? 'item' : 'items'}
                    </Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${percentage}%`, backgroundColor: color },
                      ]}
                    />
                  </View>
                  <Text style={styles.courseDetail}>
                    Available: {available} of {total}
                  </Text>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  courseCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  courseDetail: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  emptyBox: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});