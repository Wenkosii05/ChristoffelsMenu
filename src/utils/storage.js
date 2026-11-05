import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from './colors';

const STORAGE_KEY = '@menu_items';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const getMenuItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error reading menu items:', error);
    return [];
  }
};

export const saveMenuItem = async (menuItem) => {
  try {
    const existingItems = await getMenuItems();
    const newItem = {
      id: generateId(),
      name: menuItem.name,
      description: menuItem.description,
      course: menuItem.course,
      price: parseFloat(menuItem.price),
      available: menuItem.available !== undefined ? menuItem.available : true,
      createdAt: new Date().toISOString(),
    };
    const updatedItems = [...existingItems, newItem];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    return newItem;
  } catch (error) {
    console.error('Error saving menu item:', error);
    throw error;
  }
};

export const updateMenuItem = async (id, updatedData) => {
  try {
    const existingItems = await getMenuItems();
    const updatedItems = existingItems.map((item) =>
      item.id === id
        ? {
            ...item,
            ...updatedData,
            price: parseFloat(updatedData.price),
            updatedAt: new Date().toISOString(),
          }
        : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    return updatedItems.find((item) => item.id === id);
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const existingItems = await getMenuItems();
    const updatedItems = existingItems.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

// NEW: Get statistics for the menu
export const getMenuStatistics = async () => {
  const items = await getMenuItems();

  const emptyStats = {
    totalItems: 0,
    averagePrice: 0,
    totalValue: 0,
    byCourse: CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: 0 }), {}),
    availableByCourse: CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: 0 }), {}),
    unavailableCount: 0,
  };

  if (items.length === 0) return emptyStats;

  const totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const byCourse = { ...emptyStats.byCourse };
  const availableByCourse = { ...emptyStats.availableByCourse };
  let unavailableCount = 0;

  items.forEach((item) => {
    if (byCourse[item.course] !== undefined) {
      byCourse[item.course] += 1;
      if (item.available !== false) {
        availableByCourse[item.course] += 1;
      } else {
        unavailableCount += 1;
      }
    }
  });

  return {
    totalItems: items.length,
    averagePrice: totalValue / items.length,
    totalValue,
    byCourse,
    availableByCourse,
    unavailableCount,
  };
};