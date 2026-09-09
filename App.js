import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { COLORS } from './src/utils/colors';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}