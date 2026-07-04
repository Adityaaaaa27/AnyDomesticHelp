/**
 * FooterComponent — App footer with navigation links and copyright.
 */

import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface FooterComponentProps {
  onNavigate: (routeName: string) => void;
}

const FOOTER_LINKS_ROW_1 = [
  { label: 'Privacy Policy', route: 'PrivacyPolicy' },
  { label: 'Terms & Conditions', route: 'TermsAndConditions' },
];

const FOOTER_LINKS_ROW_2 = [
  { label: 'FAQ', route: 'FAQ' },
  { label: 'Management Team', route: 'ManagementTeam' },
];

const FOOTER_LINKS_ROW_3 = [
  { label: 'Refund and Cancellation', route: 'RefundCancellation' },
];

const FOOTER_NAV = [
  { label: 'Home', route: 'Home' },
  { label: 'About Us', route: 'AboutUs' },
  { label: 'Contact Us', route: 'Contact' },
];

const FooterComponent: React.FC<FooterComponentProps> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      {/* Brand */}
      <Text style={styles.brandName}>Any Domestic Help</Text>
      <Text style={styles.brandTagline}>
        Connecting homes with trust and reliability since 2018.
      </Text>

      {/* Link Sections */}
      <View style={styles.linksContainer}>
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>COMPANY</Text>
          <TouchableOpacity
            onPress={() => onNavigate('AboutUs')}
            accessibilityRole="link"
            accessibilityLabel="About Us"
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('HowItWorks')}
            accessibilityRole="link"
            accessibilityLabel="How It Works"
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Careers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>LEGAL</Text>
          {FOOTER_LINKS_ROW_1.map((link) => (
            <TouchableOpacity
              key={link.route}
              onPress={() => onNavigate(link.route)}
              accessibilityRole="link"
              accessibilityLabel={link.label}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => onNavigate('TermsAndConditions')}
            accessibilityRole="link"
            accessibilityLabel="Terms"
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Terms</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Copyright */}
      <Text style={styles.copyright}>
        © 2024 Any Domestic Help. All rights reserved.
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
    justifyContent: 'flex-start',
    gap: spacing.xxl,
    marginBottom: spacing.lg,
  },
  linkColumn: {
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
