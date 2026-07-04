import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface ValidationErrorTextProps {
  error?: string;
}

const ValidationErrorText: React.FC<ValidationErrorTextProps> = ({ error }) => {
  if (!error) return null;
  return (
    <Text style={styles.errorText} accessibilityRole="text">
      {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.error,
    lineHeight: typography.lineHeight.error,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
});

export default ValidationErrorText;
