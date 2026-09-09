import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

export default function CustomButton({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  style,
}) {
  const getButtonStyle = () => {
    if (disabled) return styles.disabled;
    switch (type) {
      case 'primary':
        return styles.primary;
      case 'outline':
        return styles.outline;
      case 'danger':
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'outline':
        return styles.outlineText;
      default:
        return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: COLORS.transparent,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  disabled: {
    backgroundColor: COLORS.textLight,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});