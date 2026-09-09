import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, CATEGORIES } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { saveMenuItem } from '../utils/storage';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function AddDishScreen({ navigation }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!course) {
      newErrors.course = 'Please select a course';
    }
    
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = 'Please enter a valid price (greater than 0)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const newItem = {
        name: dishName.trim(),
        description: description.trim(),
        course: course,
        price: parseFloat(price),
      };

      await saveMenuItem(newItem);
      
      Alert.alert(
        '✅ Congratulations Chef!',
        `"${dishName}" has been added to the menu.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setDishName('');
              setDescription('');
              setPrice('');
              setCourse(CATEGORIES[0]);
              setErrors({});
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save menu item. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header title="Add New Dish" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.instruction}>Enter the details for the new dish below.</Text>
        
        <CustomInput
          label="Dish Name"
          value={dishName}
          onChangeText={setDishName}
          placeholder="e.g., Grilled Ribeye Steak"
          required={true}
          error={errors.dishName}
        />
        
        <CustomInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the dish, ingredients, or preparation..."
          required={true}
          multiline={true}
          numberOfLines={4}
          error={errors.description}
        />
        
        <View style={styles.pickerContainer}>
          <Text style={globalStyles.label}>Course *</Text>
          <View style={[styles.pickerWrapper, errors.course && globalStyles.inputError]}>
            <Picker
              selectedValue={course}
              onValueChange={(itemValue) => setCourse(itemValue)}
              style={styles.picker}
            >
              {CATEGORIES.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
          {errors.course && <Text style={globalStyles.errorText}>{errors.course}</Text>}
        </View>
        
        <CustomInput
          label="Price (R)"
          value={price}
          onChangeText={setPrice}
          placeholder="0.00"
          keyboardType="decimal-pad"
          required={true}
          error={errors.price}
        />
        
        <View style={styles.buttonRow}>
          <CustomButton
            title="Cancel"
            type="outline"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          />
          <CustomButton
            title="Save Dish"
            type="primary"
            onPress={handleSave}
            disabled={saving}
            style={styles.saveButton}
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
  instruction: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerWrapper: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 2,
    marginLeft: 8,
  },
});