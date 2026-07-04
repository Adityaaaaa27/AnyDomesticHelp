import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';
import AppHeader from '../components/navigation/AppHeader';
import ScreenContainer from '../components/layout/ScreenContainer';

const CongratsPaymentScreen: React.FC<any> = ({ route, navigation }) => {
  const { employerName } = route.params || {};

  const handlePayNow = () => {
    navigation.navigate('ScanAndPay');
  };

  return (
    <ScreenContainer scrollEnabled={true} backgroundColor="#E0F2F1">
      <AppHeader
        title="Congratulations!"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.congratsHeader}>Congratulations!</Text>
          
          <Text style={styles.certifiedAlert}>
            Any Domestic Help is the only Domestic Help Agency in the country certified by 4 Government of India Departments.
          </Text>

          <View style={styles.checklistContainer}>
            <Text style={styles.checklistItem}>• National Skills Development Corporation</Text>
            <Text style={styles.checklistItem}>• Skills India</Text>
            <Text style={styles.checklistItem}>• Startup India</Text>
            <Text style={styles.checklistItem}>• Private limited company registered under the Companies Act 2013</Text>
          </View>

          <Text style={styles.greetingName}>
            Hi {employerName || 'Aditya Bhandare'},
          </Text>

          <Text style={styles.introParagraph}>
            Greetings from <Text style={styles.boldText}>Any Domestic Help</Text>!{'\n'}
            The team at Any Domestic Help is honoured to serve you and welcome you as an esteemed customer.
          </Text>

          <Text style={styles.feeExplanation}>
            Any Domestic Help charges a <Text style={styles.boldText}>registration fee of Rs. 1000</Text> before the screening process.{'\n'}
            This amount is <Text style={styles.highlightGreen}>completely adjustable</Text> against our consultancy charges and <Text style={styles.highlightGreen}>refundable</Text> if we do not provide you with the services required.
          </Text>

          <View style={styles.signatureBlock}>
            <Text style={styles.sigText}>Thank you,</Text>
            <Text style={styles.sigName}>Alisha Rai</Text>
            <Text style={styles.sigTitle}>Customer Loyalty Executive</Text>
            <Text style={styles.sigContact}>Call: 022-66661314</Text>
            <Text style={styles.sigContact}>Call or Whatsapp: 8879392064</Text>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePayNow} activeOpacity={0.8}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  congratsHeader: {
    fontSize: 26,
    fontWeight: typography.fontWeight.bold,
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  certifiedAlert: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: '#c62828',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  checklistContainer: {
    marginBottom: spacing.lg,
    backgroundColor: '#f5f5f5',
    padding: spacing.md,
    borderRadius: 12,
  },
  checklistItem: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semibold,
    color: '#1565c0',
    lineHeight: 22,
    marginBottom: 4,
  },
  greetingName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: '#d32f2f',
    marginBottom: spacing.sm,
  },
  introParagraph: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  feeExplanation: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  boldText: {
    fontWeight: 'bold',
  },
  highlightGreen: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  signatureBlock: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: spacing.md,
    marginBottom: spacing.xl,
  },
  sigText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  sigName: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: '#333',
    marginBottom: 2,
  },
  sigTitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  sigContact: {
    fontSize: 13,
    color: '#1565c0',
    lineHeight: 18,
  },
  payButton: {
    height: 52,
    backgroundColor: '#800020', // Burgundy red matching pay now button in screenshot
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
});

export default CongratsPaymentScreen;
