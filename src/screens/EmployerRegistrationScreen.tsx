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

import ScreenContainer  from '../components/layout/ScreenContainer';
import AppHeader        from '../components/navigation/AppHeader';
import SectionHeading   from '../components/layout/SectionHeading';
import TextInputField   from '../components/forms/TextInputField';
import PhoneInputField  from '../components/forms/PhoneInputField';
import EmailInputField  from '../components/forms/EmailInputField';
import SearchableDropdown from '../components/forms/SearchableDropdown';
import StandardDropdown from '../components/forms/StandardDropdown';
import PrimaryButton    from '../components/buttons/PrimaryButton';
import FeatureImage     from '../components/media/FeatureImage';
import FooterComponent  from '../components/layout/FooterComponent';
import LoadingSpinner   from '../components/layout/LoadingSpinner';

import { submitEmployerRegistration } from '../services/apiService';
import { CITIES }                     from '../constants/cities';
import { WORKING_HOURS, SERVICES }    from '../constants/services';
import colors                         from '../constants/colors';
import spacing                        from '../constants/spacing';
import typography                     from '../constants/typography';
import { useLanguage }                from '../context/LanguageContext';

export default function EmployerRegistrationScreen() {
  const route      = useRoute<any>();
  const navigation = useNavigation<any>();
  const { t }      = useLanguage();

  const { serviceKey = 'BabySitter', serviceLabel = 'Baby Sitter' } = (route.params || {}) as { serviceKey: string; serviceLabel: string };
  const matchedService = SERVICES.find(s => s.key === serviceKey);
  const serviceImageUrl = matchedService?.imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80';

  // Build schema using translated messages
  const schema = yup.object({
    name:         yup.string().min(2, t.errNameMin).required(t.errNameRequired),
    phone:        yup.string()
                     .matches(/^[6-9]\d{9}$/, t.errPhoneInvalid)
                     .required(t.errPhoneRequired),
    email:        yup.string().email(t.errEmailInvalid).required(t.errEmailRequired),
    city:         yup.string().required(t.errCityRequired),
    workingHours: yup.string().required(t.errWorkingHoursRequired),
  });
  type FormValues = yup.InferType<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
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
      navigation.navigate('Payment', {
        message: `Thank you, ${values.name}!\n\nYour ${serviceLabel} request has been received. Please pay to proceed.`,
      });
    } catch {
      Alert.alert(t.submitFailed, t.submitFailedMsg);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <ScreenContainer
      scrollEnabled={true}
      keyboardAvoiding={true}
      backgroundColor={colors.background}
      header={
        <AppHeader
          title={t.registrationTitle}
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          onMenuPress={() => navigation.navigate('MainDrawer')}
        />
      }
    >
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbText}>{t.breadcrumbServices}</Text>
        <Text style={[styles.breadcrumbText, styles.activeBreadcrumb]}>{t.breadcrumbRegistration}</Text>
      </View>

      <View style={styles.container}>
        <SectionHeading title={t.registrationTitle} />

        {/* Service Hero Banner Photo */}
        <View style={styles.imageContainer}>
          <FeatureImage 
            sourceUrl={serviceImageUrl} 
            aspectRatio={2.4}
            borderRadius={18}
          />
        </View>

        {/* Service badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{serviceLabel} {t.serviceLabel}</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Controller control={control} name="name" render={({ field: { onChange, value } }) => (
            <TextInputField label={t.nameLabel} required value={value ?? ''} onChangeText={onChange} error={errors.name?.message} placeholder={t.namePlaceholder} />
          )} />

          <Controller control={control} name="phone" render={({ field: { onChange, value } }) => (
            <PhoneInputField label={t.phoneLabel} required value={value ?? ''} onChangeText={onChange} error={errors.phone?.message} placeholder={t.phonePlaceholder} maxLength={10} />
          )} />

          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
            <EmailInputField label={t.emailLabel} required value={value ?? ''} onChangeText={onChange} error={errors.email?.message} placeholder={t.emailPlaceholder} />
          )} />

          <Controller control={control} name="city" render={({ field: { onChange, value } }) => (
            <SearchableDropdown label={t.cityLabel} required options={CITIES} selectedValue={value ?? ''} onValueChange={onChange} error={errors.city?.message} placeholder={t.cityPlaceholder} />
          )} />

          <Controller control={control} name="workingHours" render={({ field: { onChange, value } }) => (
            <StandardDropdown label={t.workingHoursLabel} required options={WORKING_HOURS} selectedValue={value ?? ''} onValueChange={onChange} error={errors.workingHours?.message} placeholder={t.workingHoursPlaceholder} />
          )} />

          <PrimaryButton
            label={submitting ? t.registeringBtn : t.registerBtn}
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
          <Text style={styles.featureTitle}>{t.verifiedProf}</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>🎧</Text>
          <Text style={styles.featureTitle}>{t.support247}</Text>
        </View>
      </View>

      <FooterComponent onNavigate={r => navigation.navigate(r)} />

      <LoadingSpinner visible={submitting} />
    </ScreenContainer>
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
  imageContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.xs,
  },
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
