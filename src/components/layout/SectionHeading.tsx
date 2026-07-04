/**
 * SectionHeading — H2-level heading matching Stitch design.
 */

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accessibilityLabel?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.heading, centered && styles.centered]}
        accessibilityRole="header"
        accessibilityLabel={accessibilityLabel || title}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.subtitle, centered && styles.centered]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.sectionTitleMarginBottom,
    marginTop: spacing.md,
  },
  heading: {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.h2,
    letterSpacing: typography.letterSpacing.heading,
  },
  subtitle: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
    marginTop: spacing.xs,
  },
  centered: {
    textAlign: 'center',
  },
});

export default SectionHeading;
