import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';
import AppHeader from '../components/navigation/AppHeader';
import ScreenContainer from '../components/layout/ScreenContainer';

const OtpVerificationScreen: React.FC<any> = ({ route, navigation }) => {
  const { employerName, employerPhone, expectedOtp } = route.params || {};
  const [otp, setOtp] = useState('');
  const [currentExpectedOtp, setCurrentExpectedOtp] = useState(expectedOtp || '123456');

  const handleSubmit = () => {
    if (otp.trim() === currentExpectedOtp) {
      navigation.navigate('CongratsPayment', {
        employerName,
        employerPhone,
      });
    } else {
      Alert.alert('Invalid OTP', 'The One Time Password you entered is incorrect. Please try again.');
    }
  };

  const handleResend = () => {
    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    setCurrentExpectedOtp(newOtp);
    Alert.alert(
      'New OTP Sent',
      `A new One Time Password (OTP) has been sent to ${employerPhone}. \n\nFor demo purposes, your new OTP is: ${newOtp}`
    );
  };

  return (
    <ScreenContainer scrollEnabled={true} keyboardAvoiding={true} backgroundColor="#E8F5E9">
      <AppHeader
        title="OTP Verification"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.keyIcon}>🔑</Text>
          <Text style={styles.title}>OTP Verification</Text>
          
          <Text style={styles.subtitle}>
            To complete your registration, enter the One Time Password (OTP) sent to your registered mobile number.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            textAlign="center"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>✓ Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton} onPress={handleResend} activeOpacity={0.8}>
            <Text style={styles.resendButtonText}>⟳ Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  keyIcon: {
    fontSize: 42,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: '#004d40',
    marginBottom: spacing.md,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#00796b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  input: {
    width: '100%',
    height: 54,
    borderWidth: 1.5,
    borderColor: '#00796b',
    borderRadius: 12,
    fontSize: 22,
    fontWeight: typography.fontWeight.semibold,
    color: '#333',
    backgroundColor: '#fafafa',
    marginBottom: spacing.lg,
    letterSpacing: 6,
  },
  submitButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#005f73',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  resendButton: {
    width: '100%',
    height: 52,
    borderWidth: 1.5,
    borderColor: '#005f73',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
    color: '#005f73',
  },
});

export default OtpVerificationScreen;
