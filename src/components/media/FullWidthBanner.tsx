/**
 * FullWidthBanner — Full-width header banner displaying the logo/brand.
 */

import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const BANNER_ASPECT_RATIO = 350 / 1200; // Aspect ratio based on standard website banner

interface FullWidthBannerProps {
  sourceUrl?: string;
}

const FullWidthBanner: React.FC<FullWidthBannerProps> = ({
  sourceUrl = 'https://www.anydomestichelp.com/images/Banner.png',
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: sourceUrl }}
        style={styles.image}
        contentFit="contain"
        cachePolicy="disk"
        transition={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.backgroundDark,
    aspectRatio: 1200 / 350,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default FullWidthBanner;
