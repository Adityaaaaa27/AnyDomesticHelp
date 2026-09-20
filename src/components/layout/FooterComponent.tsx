/**
 * FooterComponent — App footer with navigation links and copyright.
 */

import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface FooterComponentProps {
  onNavigate?: (routeName: string) => void;
}

const COMPANY_LINKS = [
  { label: 'About Us', route: 'AboutUs' },
  { label: 'Careers', route: 'Careers' },
  { label: 'How It Works', route: 'HowItWorks' },
  { label: 'Contact Us', route: 'Contact' },
  { label: 'Management Team', route: 'ManagementTeam' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', route: 'PrivacyPolicy' },
  { label: 'Terms & Conditions', route: 'TermsAndConditions' },
  { label: 'Refund & Cancellation', route: 'RefundCancellation' },
  { label: 'FAQ', route: 'FAQ' },
];

const FooterComponent: React.FC<FooterComponentProps> = ({ onNavigate }) => {
  const navigation = useNavigation<any>();

  const handleNavigate = (route: string) => {
    // 1. If explicit onNavigate callback was passed, try it first
    if (onNavigate) {
      try {
        onNavigate(route);
        return;
      } catch (e) {
        console.warn('onNavigate prop failed, using fallback navigation:', e);
      }
    }

    // 2. Direct navigation via react-navigation
    try {
      navigation.navigate(route);
    } catch (e1) {
      try {
        // 3. Nested navigator fallback (e.g. from inside drawer or tabs)
        navigation.getParent()?.navigate(route);
      } catch (e2) {
        console.warn('Navigation failed for route:', route, e2);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand */}
      <Text style={styles.brandName}>Any Domestic Help</Text>
      <Text style={styles.brandTagline}>
        Connecting homes with trust and reliability since 2018.
      </Text>

      {/* Link Sections */}
      <View style={styles.linksContainer}>
        {/* Company Column */}
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>COMPANY</Text>
          {COMPANY_LINKS.map((link) => (
            <TouchableOpacity
              key={link.route}
              onPress={() => handleNavigate(link.route)}
              accessibilityRole="link"
              accessibilityLabel={link.label}
              style={styles.linkButton}
              activeOpacity={0.7}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={styles.linkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal & Help Column */}
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>LEGAL & HELP</Text>
          {LEGAL_LINKS.map((link) => (
            <TouchableOpacity
              key={link.route}
              onPress={() => handleNavigate(link.route)}
              accessibilityRole="link"
              accessibilityLabel={link.label}
              style={styles.linkButton}
              activeOpacity={0.7}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={styles.linkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Copyright */}
      <Text style={styles.copyright}>
        © 2026 Any Domestic Help. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundGrey,
    paddingVertical: spacing.footerPaddingVertical,
    paddingHorizontal: spacing.footerPaddingHorizontal,
    marginTop: spacing.xl,
  },
  brandName: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  brandTagline: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  linkColumn: {
    flex: 1,
    gap: spacing.sm,
  },
  columnTitle: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.wider,
    marginBottom: spacing.xs,
  },
  linkButton: {
    minHeight: spacing.minTouchTarget / 2,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  linkText: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  copyright: {
    fontSize: typography.fontSize.caption,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});

export default FooterComponent;
