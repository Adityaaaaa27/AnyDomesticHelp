/**
 * PaginationButton — "« Previous" / "Next »" text button.
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface PaginationButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  direction: 'previous' | 'next';
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  onPress,
  disabled = false,
  direction,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        direction === 'next' && styles.nextButton,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          styles.label,
          direction === 'next' && styles.nextLabel,
          disabled && styles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.cardBorderRadius,
    minHeight: spacing.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  nextLabel: {
    color: colors.textWhite,
  },
  disabledLabel: {
    color: colors.textTertiary,
  },
});

export default PaginationButton;
