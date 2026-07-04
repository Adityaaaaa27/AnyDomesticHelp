/**
 * TabButton — Active/inactive tab selector for T&C screen.
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface TabButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, active && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: spacing.minTouchTarget,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  activeLabel: {
    color: colors.textWhite,
  },
});

export default TabButton;
