import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import TextInputField from '../components/forms/TextInputField';
import PhoneInputField from '../components/forms/PhoneInputField';
import EmailInputField from '../components/forms/EmailInputField';
import SearchableDropdown from '../components/forms/SearchableDropdown';
import StandardDropdown from '../components/forms/StandardDropdown';
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import { employerRegistrationSchema, EmployerRegistrationFormData } from '../utils/validation';
import { submitEmployerRegistration } from '../api/employerRegistration';
import { SERVICES, WORKING_HOURS } from '../constants/services';
import { CITIES } from '../constants/cities';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const EmployerRegistrationScreen: React.FC<any> = ({ route, navigation }) => {
  const { serviceKey = 'BabySitter', serviceLabel = 'Baby Sitter' } = route.params || {};
  const [loading, setLoading] = useState(false);

  const selectedService = SERVICES.find((s) => s.key === serviceKey) || SERVICES[0];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployerRegistrationFormData>({
    resolver: yupResolver(employerRegistrationSchema) as any,
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      hours: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const result = await submitEmployerRegistration(serviceKey, data);
    setLoading(false);

    if (result.success) {
      // Generate random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      Alert.alert(
        'OTP Sent',
        `A One Time Password (OTP) has been sent to your mobile number ${data.phone}. \n\nFor demo purposes, your OTP is: ${otp}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('OtpVerification', {
                employerName: data.name,
                employerPhone: data.phone,
                expectedOtp: String(otp),
              });
            },
          },
        ]
      );
    } else {
      Alert.alert('Registration Failed', result.message);
    }
  };

  return (
    <ScreenContainer scrollEnabled={true} keyboardAvoiding={true} backgroundColor={colors.background}>
      <AppHeader
        title="Registration"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbText}>Services › </Text>
        <Text style={[styles.breadcrumbText, styles.activeBreadcrumb]}>Registration</Text>
      </View>

      <SectionHeading title="Employer Registration" />

      {/* Selected Service Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.serviceBadge}>
          <Text style={styles.badgeEmoji}>{selectedService.emoji}</Text>
          <Text style={styles.badgeText}>{selectedService.label} Service</Text>
        </View>
      </View>

      <LoadingSpinner visible={loading} />

      <View style={styles.formCard}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Name of Employer"
              required={true}
              placeholder="Enter full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
              prefixIcon="👤"
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <PhoneInputField
              label="Phone Number"
              required={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <EmailInputField
              label="E-Mail Id"
              required={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <SearchableDropdown
              label="City"
              required={true}
              options={CITIES}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.city?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="hours"
          render={({ field: { onChange, value } }) => (
            <StandardDropdown
              label="Working Hours"
              required={true}
              options={WORKING_HOURS}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.hours?.message}
              prefixIcon="⏰"
            />
          )}
        />

        <PrimaryButton
          label="Submit Registration"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
          icon="➔"
        />
      </View>

      {/* Feature highlight items */}
      <View style={styles.featuresRow}>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>🛡️</Text>
          <Text style={styles.featureTitle}>Verified Professionals Only</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>🎧</Text>
          <Text style={styles.featureTitle}>24/7 Dedicated Support</Text>
        </View>
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.sm,
  },
  breadcrumbText: {
    fontSize: typography.fontSize.caption,
    color: colors.textTertiary,
  },
  activeBreadcrumb: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  badgeContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
  },
  serviceBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  badgeText: {
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  formCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    marginHorizontal: spacing.screenHorizontalPadding - 4,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  submitBtn: {
    marginTop: spacing.md,
    marginHorizontal: spacing.screenHorizontalPadding,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  featureBox: {
    flex: 1,
    backgroundColor: colors.primaryLight + '40',
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  featureTitle: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default EmployerRegistrationScreen;
