/**
 * ServiceImageCard — Tappable image card with service label overlay (for carousel).
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface ServiceImageCardProps {
  imageUrl: string;
  label: string;
  onPress: () => void;
}

const ServiceImageCard: React.FC<ServiceImageCardProps> = ({
  imageUrl,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Register for ${label}`}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
        defaultSource={require('../../assets/placeholder.png')}
      />
      <View style={styles.overlay}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.subtitle}>Verified & Experienced caregivers</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: spacing.carouselHeight,
    borderRadius: spacing.carouselBorderRadius,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  label: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wider,
  },
  subtitle: {
    fontSize: typography.fontSize.caption,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
});

export default ServiceImageCard;
