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
    const upiUrl = 'upi://pay?pa=mumbaichris60@okhdfcbank&pn=chris%20Mumbai&am=1000&cu=INR&tn=Registration%20Fee';
    Linking.openURL(upiUrl).catch(() => {
      Alert.alert(
        'UPI Apps Missing',
        'Could not open a UPI app directly. Please scan the QR code using your GPay, PhonePe, Paytm, or BHIM app to complete the payment.'
      );
    });
  };

  const handleCall = () => {
    Linking.openURL('tel:7977409406');
  };

  return (
    <ScreenContainer
      scrollEnabled={true}
      backgroundColor={colors.background}
      header={
        <AppHeader
          title="Scan & Pay"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          onMenuPress={() => navigation.openDrawer()}
        />
      }
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.header}>Scan & Pay Or</Text>

          <Text style={styles.infoText}>
            You can pay us using UPI, on{' '}
            <Text style={styles.phoneLink} onPress={() => handlePayViaUPI()}>
              7977409406 (Pay via UPI)
            </Text>
          </Text>

          <Text style={styles.callInstruction}>
            After paying, please call us on{' '}
            <Text style={styles.phoneLink} onPress={handleCall}>
              7977409406
            </Text>
          </Text>

          {/* QR Code Card */}
          <View style={styles.qrCard}>
            <Image source={qrcode} style={styles.qrImage} resizeMode="contain" />
          </View>

          <View style={styles.buttonRow}>
            <PrimaryButton
              label="Confirm & Return Home"
              onPress={() => {
                Alert.alert(
                  'Payment Submitted',
                  'Thank you! We will verify your payment and get back to you shortly. You can also call or WhatsApp us on 7977409406.',
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
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontFamily: typography.fontFamilyHeading,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  phoneLink: {
    color: colors.textLink,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  callInstruction: {
    fontSize: 14,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  qrCard: {
    width: '100%',
    maxWidth: 290,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    padding: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  qrImage: {
    width: 250,
    height: 345,
  },
  buttonRow: {
    width: '100%',
    marginTop: spacing.sm,
  },
});

export default ScanAndPayScreen;
