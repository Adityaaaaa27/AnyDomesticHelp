/**
 * FeedbackThumbnail — Tappable image block on the Home screen for opening Feedback.
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

interface FeedbackThumbnailProps {
  onPress: () => void;
  sourceUrl?: string;
}

const FeedbackThumbnail: React.FC<FeedbackThumbnailProps> = ({
  onPress,
  sourceUrl = 'https://www.anydomestichelp.com/images/feedback.jpg',
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Give feedback on our services"
    >
      <Image
        source={{ uri: sourceUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: spacing.cardBorderRadius,
    overflow: 'hidden',
    backgroundColor: colors.backgroundGrey,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default FeedbackThumbnail;
