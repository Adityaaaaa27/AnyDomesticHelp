import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Linking, Alert } from 'react-native';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';
import AppHeader from '../components/navigation/AppHeader';
import ScreenContainer from '../components/layout/ScreenContainer';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { qrcode } from '../assets/images';

const ScanAndPayScreen: React.FC<any> = ({ navigation }) => {
  const handlePayViaUPI = () => {
    // Launch standard UPI link intent (e.g. upi://pay)
    const upiUrl = 'upi://pay?pa=clopes024-2@okicici&pn=Christopher%20Lopes&am=1000&cu=INR&tn=Registration%20Fee';
    Linking.openURL(upiUrl).catch(() => {
      Alert.alert(
        'UPI Apps Mising',
        'Could not open a UPI app directly. Please scan the QR code using your GPay, PhonePe, Paytm, or BHIM app to complete the payment.'
      );
    });
  };

  const handleCall = () => {
    Linking.openURL('tel:9820108341');
  };

  return (
    <ScreenContainer scrollEnabled={true} backgroundColor="#E0F2F1">
      <AppHeader
        title="Payment"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.header}>Scan & Pay Or</Text>

          <Text style={styles.infoText}>
            You can pay us using UPI, on{' '}
            <Text style={styles.phoneLink} onPress={() => handlePayViaUPI()}>
              9820108341 (Pay via UPI)
            </Text>
          </Text>

          <Text style={styles.callInstruction}>
            After paying, please call us on{' '}
            <Text style={styles.phoneLink} onPress={handleCall}>
              9820108341
            </Text>
          </Text>

          {/* QR Code Card */}
          <View style={styles.qrCard}>
            <View style={styles.nameHeader}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarChar}>C</Text>
              </View>
              <Text style={styles.nameText}>Christopher Lopes</Text>
            </View>

            <Image source={qrcode} style={styles.qrImage} resizeMode="contain" />

            <Text style={styles.upiIdText}>UPI ID: clopes024-2@okicici</Text>
            
            <Text style={styles.qrFooterText}>Scan to pay with any UPI app</Text>
          </View>

          <View style={styles.buttonRow}>
            <PrimaryButton
              label="Confirm & Return Home"
              onPress={() => {
                Alert.alert(
                  'Payment Submitted',
                  'Thank you! Your payment details are being verified. We will contact you shortly.',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.navigate('MainDrawer'),
                    },
                  ]
                );
              }}
            />
          </View>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: '#1b5e20',
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semibold,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  phoneLink: {
    color: '#1565c0',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  callInstruction: {
    fontSize: 14,
    fontWeight: typography.fontWeight.semibold,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  qrCard: {
    width: '90%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e0f2f1',
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  nameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00695c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarChar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nameText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
    color: '#333',
  },
  qrImage: {
    width: 220,
    height: 220,
    marginBottom: spacing.sm,
  },
  upiIdText: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semibold,
    color: '#666',
    marginBottom: spacing.xs,
  },
  qrFooterText: {
    fontSize: 12,
    color: '#888',
  },
  buttonRow: {
    width: '100%',
    marginTop: spacing.sm,
  },
});

export default ScanAndPayScreen;
