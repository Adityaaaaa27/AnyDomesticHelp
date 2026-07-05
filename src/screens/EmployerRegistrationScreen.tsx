// src/screens/EmployerRegistrationScreen.tsx
import React, { useState } from 'react';
import {
  View, ScrollView, Text, StyleSheet, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRoute, useNavigation } from '@react-navigation/native';

import AppHeader         from '../components/navigation/AppHeader';
import SectionHeading    from '../components/layout/SectionHeading';
import TextInputField    from '../components/forms/TextInputField';
import PhoneInputField   from '../components/forms/PhoneInputField';
import EmailInputField   from '../components/forms/EmailInputField';
import SearchableDropdown from '../components/forms/SearchableDropdown';
import StandardDropdown  from '../components/forms/StandardDropdown';
import PrimaryButton     from '../components/buttons/PrimaryButton';
import FooterComponent   from '../components/layout/FooterComponent';
import LoadingSpinner    from '../components/layout/LoadingSpinner';

import { submitEmployerRegistration } from '../services/apiService';
import { CITIES }                     from '../constants/cities';
import { WORKING_HOURS, SERVICES }    from '../constants/services';
import colors                         from '../constants/colors';
import spacing                        from '../constants/spacing';
import typography                     from '../constants/typography';

const schema = yup.object({
  name:         yup.string().min(2, 'Min 2 characters').required('Name is required'),
  phone:        yup.string()
                   .matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number')
                   .required('Phone is required'),
  email:        yup.string().email('Enter valid email').required('Email is required'),
  city:         yup.string().required('Please select your city'),
  workingHours: yup.string().required('Please select working hours'),
});
type FormValues = yup.InferType<typeof schema>;

export default function EmployerRegistrationScreen() {
  const route      = useRoute<any>();
  const navigation = useNavigation<any>();
  const { serviceKey = 'BabySitter', serviceLabel = 'Baby Sitter' } = (route.params || {}) as { serviceKey: string; serviceLabel: string };

  const serviceEmoji = SERVICES.find(s => s.key === serviceKey)?.emoji ?? '👶';

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      workingHours: '',
    }
  });

  const [submitting,  setSubmitting]  = useState(false);

  // ── Tap "Submit" ────────────────────────────────────────────────
  const onSubmitPress = handleSubmit(async values => {
    setSubmitting(true);
    try {
      await submitEmployerRegistration({
        name:         values.name,
        phone:        values.phone,
        email:        values.email,
        city:         values.city,
        workingHours: values.workingHours,
        serviceType:  serviceKey,
        serviceLabel: serviceLabel,
      });
      navigation.navigate('Success', {
        message: `Thank you, ${values.name}!\n\nYour ${serviceLabel} request has been received. Our team will call you on ${values.phone} within 24 hours.`,
        returnTo: 'MainDrawer',
      });
    } catch {
      Alert.alert('Submission Failed', 'Please try again or call us on 022-66661314.');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
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

        <View style={styles.container}>
          <SectionHeading title="Employer Registration" />

          {/* Service badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeEmoji}>{serviceEmoji}</Text>
              <Text style={styles.badgeLabel}>{serviceLabel} Service</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Controller control={control} name="name" render={({ field: { onChange, value } }) => (
              <TextInputField label="Name of Employer" required value={value ?? ''} onChangeText={onChange} error={errors.name?.message} placeholder="Your full name" prefixIcon="👤" />
            )} />

            <Controller control={control} name="phone" render={({ field: { onChange, value } }) => (
              <PhoneInputField label="Phone Number" required value={value ?? ''} onChangeText={onChange} error={errors.phone?.message} placeholder="10-digit mobile number" maxLength={10} />
            )} />

            <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
              <EmailInputField label="E-MAIL Id" required value={value ?? ''} onChangeText={onChange} error={errors.email?.message} placeholder="your@email.com" />
            )} />

            <Controller control={control} name="city" render={({ field: { onChange, value } }) => (
              <SearchableDropdown label="City" required options={CITIES} selectedValue={value ?? ''} onValueChange={onChange} error={errors.city?.message} placeholder="Type or select your city" />
            )} />

            <Controller control={control} name="workingHours" render={({ field: { onChange, value } }) => (
              <StandardDropdown label="Working Hours" required options={WORKING_HOURS} selectedValue={value ?? ''} onValueChange={onChange} error={errors.workingHours?.message} placeholder="Select working hours" prefixIcon="⏰" />
            )} />

            <PrimaryButton
              label={submitting ? 'Registering…' : 'Register'}
              onPress={onSubmitPress}
              loading={submitting}
              disabled={submitting}
              style={styles.submitBtn}
            />
          </View>
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

        <FooterComponent onNavigate={r => navigation.navigate(r)} />
      </ScrollView>

      <LoadingSpinner visible={submitting} />
    </KeyboardAvoidingView>
  );
}

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
  container: { gap: spacing.md },
  badgeContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.xs,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.primaryLight, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20,
    alignSelf: 'flex-start'
  },
  badgeEmoji: { fontSize: 16 },
  badgeLabel: { fontSize: typography.fontSize.bodySmall, fontWeight: typography.fontWeight.bold as any, color: colors.primary },
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
  note: {
    fontSize: typography.fontSize.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.screenHorizontalPadding,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
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
