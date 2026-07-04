import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface AppHeaderProps {
  onMenuPress: () => void;
  onProfilePress?: () => void;
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuPress,
  onProfilePress,
  title = 'Any Domestic Help',
  showBackButton = false,
  onBackPress,
}) => {
  return (
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onMenuPress}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Open navigation menu"
            >
              <View style={styles.hamburger}>
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {onProfilePress && (
            <TouchableOpacity
              onPress={onProfilePress}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="User profile"
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    ...Platform.select({
      android: {
        paddingTop: 10,
      },
    }),
  },
  container: {
    height: spacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  leftSection: {
    width: 44,
    justifyContent: 'center',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  hamburger: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    height: 2.5,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 1.25,
  },
  title: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  profileIcon: {
    fontSize: 22,
    color: colors.primary,
  },
});

export default AppHeader;
