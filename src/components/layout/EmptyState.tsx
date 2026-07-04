/**
 * EmptyState — Centered icon + message text.
 */

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface EmptyStateProps {
  icon?: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  message,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.body,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.body,
  },
});

export default EmptyState;
