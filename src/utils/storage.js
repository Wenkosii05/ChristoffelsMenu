import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@menu_items';

// Generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Get all menu items
export const getMenuItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error reading menu items:', error);
    return [];
  }
};

// Save a new menu item
export const saveMenuItem = async (menuItem) => {
  try {
    const existingItems = await getMenuItems();
    
    const newItem = {
      id: generateId(),
      ...menuItem,
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

// Update an existing menu item
export const updateMenuItem = async (id, updatedData) => {
  try {
    const existingItems = await getMenuItems();
    const updatedItems = existingItems.map((item) =>
      item.id === id
        ? { ...item, ...updatedData, updatedAt: new Date().toISOString() }
        : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    return updatedItems.find((item) => item.id === id);
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

// Delete a menu item
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