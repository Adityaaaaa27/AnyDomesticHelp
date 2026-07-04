import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface HomeProfilePreviewCardProps {
  name: string;
  jobCategory: string;
  rating?: number;
  location?: string;
  imageUrl: string;
  onPressMore: () => void;
}

const HomeProfilePreviewCard: React.FC<HomeProfilePreviewCardProps> = ({
  name,
  jobCategory,
  rating = 4.8,
  location = 'Mumbai, India',
  imageUrl,
  onPressMore,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        <Text style={styles.category}>{jobCategory}</Text>
        <Text style={styles.location}>📍 {location}</Text>

        <TouchableOpacity
          onPress={onPressMore}
          style={styles.moreButton}
          accessibilityRole="button"
          accessibilityLabel="View more profiles"
        >
          <Text style={styles.moreText}>View Profiles ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.md,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.backgroundGrey,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ratingGold + '15',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  star: {
    fontSize: 10,
    color: colors.ratingGold,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    color: colors.ratingGold,
  },
  category: {
    fontSize: typography.fontSize.caption,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginTop: 2,
    marginBottom: 4,
  },
  location: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  moreButton: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
    paddingVertical: spacing.xs,
  },
  moreText: {
    fontSize: typography.fontSize.caption,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});

export default HomeProfilePreviewCard;
