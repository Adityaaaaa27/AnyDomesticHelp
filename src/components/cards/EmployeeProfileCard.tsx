import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

export interface EmployeeProfileCardProps {
  name: string;
  jobCategory: string;
  experience: string;
  gender: string;
  timing: string;
  salary?: string;
  imageUrl: string;
  onPressBookmark?: () => void;
}

const EmployeeProfileCard: React.FC<EmployeeProfileCardProps> = ({
  name,
  jobCategory,
  experience,
  gender,
  timing,
  salary,
  imageUrl,
  onPressBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onPressBookmark) onPressBookmark();
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {loading && !error && (
          <ActivityIndicator style={styles.spinner} color={colors.primary} />
        )}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorEmoji}>👤</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity
            onPress={toggleBookmark}
            style={styles.bookmarkButton}
            accessibilityRole="button"
            accessibilityLabel="Bookmark employee"
          >
            <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarked]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{jobCategory.toUpperCase()}</Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⏱</Text>
            <Text style={styles.infoText}>{experience}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👤</Text>
            <Text style={styles.infoText}>{gender}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{timing}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.profileCardPadding,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.cardMarginBottom,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 3,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageContainer: {
    width: spacing.profileImageSize,
    height: spacing.profileImageSize,
    borderRadius: spacing.cardBorderRadius,
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
  errorEmoji: {
    fontSize: 28,
  },
  details: {
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
  bookmarkButton: {
    padding: spacing.xs,
    minWidth: spacing.minTouchTarget / 2,
    minHeight: spacing.minTouchTarget / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  bookmarked: {
    color: colors.ratingGold,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.serviceBg1,
    paddingHorizontal: spacing.badgePaddingHorizontal,
    paddingVertical: spacing.badgePaddingVertical,
    borderRadius: spacing.badgeBorderRadius,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.badge,
    fontWeight: typography.fontWeight.bold,
    color: colors.ratingGold,
  },
  infoGrid: {
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: spacing.sm,
    width: 16,
    textAlign: 'center',
  },
  infoText: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  salaryText: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  monthSuffix: {
    fontWeight: typography.fontWeight.regular,
    color: colors.textTertiary,
  },
});

export default EmployeeProfileCard;
