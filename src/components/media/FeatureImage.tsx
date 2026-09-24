/**
 * FeatureImage — Standard image display within content sections.
 * Uses expo-image for reliable cross-device caching and loading.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

const PLACEHOLDER = require('../../assets/placeholder.png');

interface FeatureImageProps {
  sourceUrl: string;
  aspectRatio?: number;
  borderRadius?: number;
  style?: object;
}

const FeatureImage: React.FC<FeatureImageProps> = ({
  sourceUrl,
  aspectRatio = 16 / 9,
  borderRadius = spacing.cardBorderRadius,
  style,
}) => {
  return (
    <View style={[styles.container, { aspectRatio, borderRadius }, style]}>
      <Image
        source={{ uri: sourceUrl }}
        style={[styles.image, { borderRadius }]}
        contentFit="cover"
        // Disk cache keeps image even after app restart
        cachePolicy="disk"
        // Shown while image loads
        placeholder={PLACEHOLDER}
        // Smooth cross-fade when image arrives
        transition={300}
        // Fallback to placeholder on error
        onError={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.backgroundGrey,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default FeatureImage;
