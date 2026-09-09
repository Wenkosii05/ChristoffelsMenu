import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  required = false,
  error = null,
  style,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          multiline && styles.multiline,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  required: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.danger,
    marginLeft: 2,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: COLORS.danger,
    borderWidth: 2,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.danger,
    marginTop: 4,
  },
});