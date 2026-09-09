import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Typography
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  
  body: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  
  // Input
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  
  inputFocused: {
    borderColor: COLORS.borderFocus,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: COLORS.danger,
    borderWidth: 2,
  },
  
  // Buttons
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  
  buttonOutline: {
    backgroundColor: COLORS.transparent,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  buttonTextOutline: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  
  fabText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '300',
  },
  
  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  
  // Misc
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  
  errorText: {
    fontSize: 13,
    color: COLORS.danger,
    marginTop: 4,
  },
});