import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image, TouchableOpacity, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import PrimaryButton from '../components/buttons/PrimaryButton';
import FeatureImage from '../components/media/FeatureImage';
import FooterComponent from '../components/layout/FooterComponent';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';
import { useLanguage } from '../context/LanguageContext';
import { qrcode } from '../assets/images';

import { openWhatsApp, callPhone } from '../utils/deepLinks';

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { t } = useLanguage();
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const handlePayViaUPI = () => {
    const upiUrl = 'upi://pay?pa=mumbaichris60@okhdfcbank&pn=Any%20Domestic%20Help&am=1000&cu=INR&tn=Registration%20Fee';
    Linking.openURL(upiUrl).catch(() => {
      Alert.alert(
        'UPI App',
        'Could not open a UPI app directly. Please scan the QR code below using your GPay, PhonePe, Paytm, or BHIM app to complete the payment.'
      );
    });
  };

  const handlePaymentDone = () => {
    setPaymentSubmitted(true);
    Alert.alert(
      t.paymentAlertTitle,
      t.paymentAlertMsg,
      [
        {
          text: 'WhatsApp Us',
          onPress: () => openWhatsApp('7977409406'),
        },
        {
          text: 'Call Us',
          onPress: () => callPhone('7977409406'),
        },
        {
          text: t.paymentAlertOk,
          onPress: () => navigation.navigate('MainDrawer'),
        },
      ]
    );
  };
  
  return (
    <ScreenContainer
      scrollEnabled={true}
      backgroundColor={colors.background}
      header={
        <AppHeader
          title={t.paymentTitle}
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          onMenuPress={() => navigation.navigate('MainDrawer', { screen: 'Home' })}
        />
      }
    >
      <View style={styles.content}>
        {route.params?.message ? (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerIcon}>✅</Text>
            <Text style={styles.successBannerText}>{route.params.message}</Text>
          </View>
        ) : null}

        <SectionHeading title={t.paymentComplete} />

        <View style={styles.imageContainer}>
          <FeatureImage 
            sourceUrl="https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&q=80"
            aspectRatio={2.5}
            borderRadius={18}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            {t.paymentInfoText.replace('₹1,000', '')}
            <Text style={styles.infoHighlight}>₹1,000</Text>
            {' '}
          </Text>
        </View>
        
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>{t.registrationFee}</Text>
          <Text style={styles.paymentAmount}>₹ 1,000</Text>
          
          {/* QR Code Container */}
          <View style={styles.qrCardWrapper}>
            <Image
              source={qrcode}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
          
          {/* UPI ID Row */}
          <View style={styles.upiRow}>
            <Text style={styles.upiLabel}>{t.upiLabel}</Text>
            <Text style={styles.upiValue} selectable={true}>mumbaichris60@okhdfcbank</Text>
          </View>

          {/* Pay via UPI button */}
          <TouchableOpacity 
            style={styles.payUpiBtn} 
            onPress={handlePayViaUPI}
            activeOpacity={0.8}
          >
            <Text style={styles.payUpiBtnText}>⚡ Pay Directly via UPI App</Text>
          </TouchableOpacity>

          <Text style={styles.instructions}>
            {t.paymentInstructions}
          </Text>
          
          {paymentSubmitted ? (
            <View style={styles.inScreenNotifCard}>
              <View style={styles.inScreenNotifHeader}>
                <Text style={styles.inScreenNotifBadge}>✅ PAYMENT SUBMITTED</Text>
              </View>
              <Text style={styles.inScreenNotifTitle}>Thank You!</Text>
              <Text style={styles.inScreenNotifText}>
                Thanks! We shall verify your payment and get back to you shortly. You can also call or WhatsApp us on 7977409406.
              </Text>
              
              <View style={styles.notifActionRow}>
                <TouchableOpacity 
                  style={styles.callActionBtn}
                  onPress={() => callPhone('7977409406')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.callActionBtnText}>📞 Call 7977409406</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.whatsappActionBtn}
                  onPress={() => openWhatsApp('7977409406')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.whatsappActionBtnText}>💬 WhatsApp Us</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.returnHomeBtn}
                onPress={() => navigation.navigate('MainDrawer')}
                activeOpacity={0.8}
              >
                <Text style={styles.returnHomeBtnText}>Return to Home</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <PrimaryButton 
              label={t.paymentDoneBtn} 
              onPress={handlePaymentDone} 
              style={styles.doneBtn}
            />
          )}
        </View>
      </View>

      <FooterComponent onNavigate={(r) => navigation.navigate(r)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  imageContainer: {
    marginBottom: spacing.xs,
  },
  successBanner: {
    backgroundColor: '#E8F5E9',
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successBannerIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  successBannerText: {
    flex: 1,
    fontSize: typography.fontSize.bodySmall,
    color: '#2E7D32',
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.bodySmall,
  },
  paymentCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginBottom: spacing.xl,
  },
  paymentTitle: {
    fontSize: typography.fontSize.h3,
    fontFamily: typography.fontFamilyHeading,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  paymentAmount: {
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  qrCardWrapper: {
    width: '100%',
    maxWidth: 290,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder || '#e0e0e0',
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
  instructions: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.bodySmall,
    marginBottom: spacing.lg,
  },
  doneBtn: {
    width: '100%',
  },
  payUpiBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  payUpiBtnText: {
    color: '#ffffff',
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
  },
  infoCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
  },
  infoHighlight: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundGrey,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    gap: spacing.xs,
    width: '100%',
  },
  upiLabel: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.bold,
  },
  upiValue: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  inScreenNotifCard: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#81C784',
    alignItems: 'center',
    marginTop: spacing.sm,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  inScreenNotifHeader: {
    marginBottom: spacing.xs,
  },
  inScreenNotifBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },
  inScreenNotifTitle: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: '#1B5E20',
    marginBottom: spacing.xs,
  },
  inScreenNotifText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  notifActionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    marginBottom: spacing.md,
  },
  callActionBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callActionBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  whatsappActionBtn: {
    flex: 1,
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappActionBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  returnHomeBtn: {
    paddingVertical: spacing.xs,
  },
  returnHomeBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
