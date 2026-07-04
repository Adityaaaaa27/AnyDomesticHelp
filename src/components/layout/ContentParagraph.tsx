/**
 * ContentParagraph — Body text block with support for inline bold text.
 */

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface ContentParagraphProps {
  children: React.ReactNode;
  style?: object;
}

const ContentParagraph: React.FC<ContentParagraphProps> = ({ children, style }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]} accessibilityRole="text">
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
  },
  text: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.body,
  },
});

export default ContentParagraph;
