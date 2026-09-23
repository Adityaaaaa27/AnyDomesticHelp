import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import ContentParagraph from '../components/layout/ContentParagraph';
import BulletList from '../components/layout/BulletList';
import FooterComponent from '../components/layout/FooterComponent';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';
import { callPhone, openWhatsApp } from '../utils/deepLinks';

const OPPORTUNITIES = [
  'House Maids & Housekeeping Staff (Full-time, Part-time, Live-in)',
  'Cooks & Home Chefs (North Indian, South Indian, Continental, Jain)',
  'Babysitters & Nannies (Infant and child care specialists)',
  'Patient Care Attendants & Elderly Caregivers',
  'Private & Commercial Chauffeurs / Drivers',
];

const CareersScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer
      scrollEnabled={true}
      backgroundColor={colors.background}
      header={
        <AppHeader
          title="Careers & Jobs"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          onMenuPress={() => navigation.openDrawer()}
        />
      }
    >
      <SectionHeading title="Work With Us" />

      <ContentParagraph>
        Any Domestic Help is India's leading household staffing platform. We connect skilled domestic workers, caregivers, and drivers with reliable families and households across India.
      </ContentParagraph>

      <SectionHeading title="Current Openings" />
      <BulletList items={OPPORTUNITIES} />

      {/* Action Cards */}
      <View style={styles.cardContainer}>
        {/* Candidate / Referral Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Looking for Work / Register Helper</Text>
          <Text style={styles.cardDesc}>
            Are you a domestic worker seeking employment, or do you want to refer an employee to our network? Register helper details now.
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('ReferAnEmployee')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryBtnText}>Register as Helper / Candidate</Text>
          </TouchableOpacity>
        </View>

        {/* Agency Partner Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Manpower Agencies & Partners</Text>
          <Text style={styles.cardDesc}>
            Are you a registered manpower agency or contractor in India? Collaborate with us to place qualified candidates.
          </Text>
          <TouchableOpacity
            style={[styles.primaryBtn, styles.secondaryBtn]}
            onPress={() => navigation.navigate('PartnerUs')}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryBtnText, styles.secondaryBtnText]}>Partner With Us</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Support Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Direct HR & Recruitment Helpline</Text>
          <Text style={styles.cardDesc}>
            For quick registration assistance or interview enquiries, call or WhatsApp our recruitment team directly:
          </Text>
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => callPhone('7977409406')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnText}>📞 Call 7977409406</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.waBtn]}
              onPress={() => openWhatsApp('7977409406', 'Hi, I am looking for job / career opportunities with Any Domestic Help.')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnText}>💬 WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
    marginBottom: spacing.md,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
  },
  secondaryBtn: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryBtnText: {
    color: colors.primary,
  },
  btnRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waBtn: {
    backgroundColor: '#25D366',
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.bold,
  },
});

export default CareersScreen;
