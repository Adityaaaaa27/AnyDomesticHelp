/**
 * DividerLine — Horizontal separator matching Stitch design tokens.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

interface DividerLineProps {
  color?: string;
  thickness?: number;
  verticalMargin?: number;
  horizontalMargin?: number;
}

const DividerLine: React.FC<DividerLineProps> = ({
  color = colors.divider,
  thickness = 1,
  verticalMargin = spacing.md,
  horizontalMargin = 0,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: verticalMargin,
          marginHorizontal: horizontalMargin,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default DividerLine;
