/**
 * BulletList — Renders array of strings as bullet items.
 */

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface BulletListProps {
  items: string[];
  bulletChar?: string;
}

const BulletList: React.FC<BulletListProps> = ({
  items,
  bulletChar = '•',
}) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.bullet}>{bulletChar}</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: typography.fontSize.body,
    color: colors.primary,
    marginRight: spacing.sm,
    lineHeight: typography.lineHeight.body,
    fontWeight: typography.fontWeight.bold,
  },
  text: {
    flex: 1,
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.body,
  },
});

export default BulletList;
