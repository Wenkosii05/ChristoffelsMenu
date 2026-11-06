import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, CATEGORIES } from '../utils/colors';
import { globalStyles } from '../utils/styles';
import { saveMenuItem } from '../utils/storage';
import { validateDishForm } from '../utils/validators';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function AddDishScreen({ navigation }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const { errors: validationErrors, isValid } = validateDishForm({
      name: dishName,
      description,
      course,
      price,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      await saveMenuItem({
        name: dishName.trim(),
        description: description.trim(),
        course,
        price,
        available,
      });

      Alert.alert(
        '✅ Success!',
        `"${dishName.trim()}" has been added to the menu.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setDishName('');
              setDescription('');
              setPrice('');
              setCourse(CATEGORIES[0]);
              setAvailable(true);
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

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.instruction}>
          Enter the details for the new dish below. Fields marked with * are
          required.
        </Text>

        <CustomInput
          label="Dish Name"
          value={dishName}
          onChangeText={(text) => {
            setDishName(text);
            if (errors.name) setErrors({ ...errors, name: null });
          }}
          placeholder="e.g., Grilled Ribeye Steak"
          required={true}
          error={errors.name}
        />

        <CustomInput
          label="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (errors.description) setErrors({ ...errors, description: null });
          }}
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
              onValueChange={(value) => setCourse(value)}
              style={styles.picker}
            >
              {CATEGORIES.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
          {errors.course && (
            <Text style={globalStyles.errorText}>{errors.course}</Text>
          )}
        </View>

        <CustomInput
          label="Price (R)"
          value={price}
          onChangeText={(text) => {
            setPrice(text);
            if (errors.price) setErrors({ ...errors, price: null });
          }}
          placeholder="0.00"
          keyboardType="decimal-pad"
          required={true}
          error={errors.price}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Currently Available</Text>
          <Switch
            value={available}
            onValueChange={setAvailable}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={styles.buttonRow}>
          <CustomButton
            title="Cancel"
            type="outline"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          />
          <CustomButton
            title={saving ? 'Saving...' : 'Save Dish'}
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
  container: { padding: 16, paddingBottom: 40 },
  instruction: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  pickerContainer: { marginBottom: 16 },
  pickerWrapper: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: { height: 50 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  switchLabel: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { flex: 1, marginRight: 8 },
  saveButton: { flex: 2, marginLeft: 8 },
});