/**
 * PrimaryButton — Branded CTA button with loading and disabled states.
 */

import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  variant?: 'filled' | 'outlined';
  style?: object;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  icon,
  variant = 'filled',
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outlined' && styles.outlined,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outlined' ? colors.primary : colors.textWhite}
        />
      ) : (
        <View style={styles.contentRow}>
          <Text
            style={[
              styles.label,
              variant === 'outlined' && styles.outlinedLabel,
              isDisabled && styles.disabledLabel,
            ]}
          >
            {label}
          </Text>
          {icon ? <Text style={styles.iconText}>{icon}</Text> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: spacing.buttonHeight,
    borderRadius: spacing.buttonBorderRadius,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.buttonPaddingHorizontal,
    marginHorizontal: spacing.screenHorizontalPadding,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabled: {
    backgroundColor: colors.disabledBg,
    elevation: 0,
    shadowOpacity: 0,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.button,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    letterSpacing: typography.letterSpacing.wide,
  },
  outlinedLabel: {
    color: colors.primary,
  },
  disabledLabel: {
    color: colors.disabled,
  },
  iconText: {
    fontSize: 18,
    color: colors.textWhite,
  },
});

export default PrimaryButton;
