import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import ContactInfoRow from '../components/layout/ContactInfoRow';
import PrimaryButton from '../components/buttons/PrimaryButton';
import FooterComponent from '../components/layout/FooterComponent';
import { openMaps } from '../utils/deepLinks';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const OFFICE_ADDRESS = '54, Mamta \'A\' wing, A.M. Marg, Prabhadevi, Mumbai - 400 025.';

const ContactScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="Contact Us"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Contact Info" />

      {/* Address Card */}
      <View style={styles.officeCard}>
        <View style={styles.officeHeader}>
          <Text style={styles.officeIcon}>🏢</Text>
          <Text style={styles.officeTitle}>Registered Office</Text>
        </View>
        <Text style={styles.officeAddress}>{OFFICE_ADDRESS}</Text>
        <TouchableOpacity
          onPress={() => openMaps(OFFICE_ADDRESS)}
          style={styles.mapLink}
          accessibilityRole="button"
          accessibilityLabel="Open office address in Google Maps"
        >
          <Text style={styles.mapLinkText}>View on Google Maps ↗</Text>
        </TouchableOpacity>
      </View>

      {/* Styled Map Image block */}
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
          }}
          style={styles.mapPlaceholder}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => openMaps(OFFICE_ADDRESS)}
        >
          <Text style={styles.mapButtonText}>Open Navigation</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Info Rows */}
      <ContactInfoRow
        type="phone"
        label="Call Support"
        value="022-66661314"
      />
      <ContactInfoRow
        type="whatsapp"
        label="WhatsApp Chat"
        value="9820108341"
      />
      <ContactInfoRow
        type="email"
        label="Email Us"
        value="info@anydomestichelp.com"
      />

      {/* Help Banner */}
      <View style={styles.helpBanner}>
        <Text style={styles.helpTitle}>Need immediate help?</Text>
        <Text style={styles.helpSubtitle}>
          Our customer service is available 24/7 for urgent bookings and support.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('FAQ')}
          style={styles.faqBtn}
          accessibilityRole="button"
          accessibilityLabel="Go to FAQ Section"
        >
          <Text style={styles.faqBtnText}>F.A.Q Section</Text>
        </TouchableOpacity>
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  officeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.md,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  officeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  officeIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  officeTitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  officeAddress: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
    marginBottom: spacing.sm,
  },
  mapLink: {
    alignSelf: 'flex-start',
  },
  mapLinkText: {
    fontSize: typography.fontSize.caption + 1,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  mapContainer: {
    height: 180,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.lg,
    borderRadius: spacing.cardBorderRadius,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
  },
  mapButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mapButtonText: {
    fontSize: typography.fontSize.caption + 1,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  helpBanner: {
    backgroundColor: colors.primary,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.sm,
  },
  helpSubtitle: {
    fontSize: typography.fontSize.caption + 1,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  faqBtn: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    minHeight: spacing.minTouchTarget,
    justifyContent: 'center',
  },
  faqBtnText: {
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});

export default ContactScreen;
