/**
 * FeatureImage — Standard image display within content sections.
 */

import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={[styles.container, { aspectRatio, borderRadius }, style]}>
      {loading && !error && (
        <ActivityIndicator style={styles.spinner} color={colors.primary} />
      )}
      <Image
        source={{ uri: sourceUrl }}
        style={[styles.image, { borderRadius }]}
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      {error && (
        <View style={[styles.errorContainer, { borderRadius }]}>
          <View style={styles.noPhotoBox}>
            <Image
              source={require('../../assets/placeholder.png')}
              style={styles.placeholderIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
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
  spinner: {
    position: 'absolute',
    zIndex: 1,
  },
  errorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.disabledBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhotoBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 60,
    height: 60,
    opacity: 0.3,
  },
});

export default FeatureImage;
