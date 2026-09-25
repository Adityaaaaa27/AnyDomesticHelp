import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AppVideoPlayer from '../media/AppVideoPlayer';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

interface HomeVideoSectionProps {
  onLearnMore?: () => void;
}

export const HomeVideoSection: React.FC<HomeVideoSectionProps> = ({ onLearnMore }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      {!isPlaying ? (
        <View style={styles.bannerCard}>
          <View style={styles.contentRow}>
            {/* Play Badge Icon */}
            <View style={styles.playIconContainer}>
              <View style={styles.playCircle}>
                <Text style={styles.playTriangle}>▶</Text>
              </View>
            </View>

            {/* Text details */}
            <View style={styles.textContainer}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>ABOUT OUR SERVICE</Text>
              </View>
              <Text style={styles.cardTitle}>Who We Are & What We Provide</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                Watch our quick video on how Any Domestic Help connects Indian homes with verified maids, cooks & caregivers.
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.watchButton}
            activeOpacity={0.85}
            onPress={() => setIsPlaying(true)}
            accessibilityRole="button"
            accessibilityLabel="Watch video about who we are and what we provide"
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonIcon}>▶</Text>
              <Text style={styles.buttonText}>Watch Video</Text>
            </View>
            <Text style={styles.buttonDuration}>1 min</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.activePlayerWrapper}>
          <AppVideoPlayer
            autoPlay={true}
            loop={false}
            showTitleHeader={true}
            title="Who Any Domestic Help Is & What We Provide"
            subtitle="Verified domestic workers, cooks, nannies & elderly caregivers"
            onClose={() => setIsPlaying(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  bannerCard: {
    backgroundColor: '#334A36', // Primary dark olive green
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 14,
  },
  playIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  playTriangle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 3,
  },
  textContainer: {
    flex: 1,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#E8EFE9',
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.6,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: typography.fontFamilyHeading,
  },
  cardDesc: {
    color: '#D1DFD3',
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
  watchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonIcon: {
    color: '#334A36',
    fontSize: 14,
    fontWeight: '800',
  },
  buttonText: {
    color: '#334A36',
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.2,
  },
  buttonDuration: {
    color: '#5A665D',
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
  },
  activePlayerWrapper: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default HomeVideoSection;
