// src/screens/PartnerUsScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import TextInputField from '../components/forms/TextInputField';
import PhoneInputField from '../components/forms/PhoneInputField';
import EmailInputField from '../components/forms/EmailInputField';
import MultilineInputField from '../components/forms/MultilineInputField';
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import FeatureImage from '../components/media/FeatureImage';

import { submitPartnerRegistration } from '../services/apiService';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const schema = yup.object({
  fullName:      yup.string().min(2, 'Min 2 characters').required('Full name / organization is required'),
  contactPerson: yup.string().min(2, 'Min 2 characters').required('Contact person name is required'),
  phone:         yup.string()
                    .matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number')
                    .required('Phone number is required'),
  email:         yup.string().email('Enter valid email').required('Email is required'),
  city:          yup.string().required('City is required'),
  message:       yup.string().max(500, 'Max 500 characters').optional(),
});
type FormValues = yup.InferType<typeof schema>;

const PartnerUsScreen: React.FC<any> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      fullName: '',
      contactPerson: '',
      phone: '',
      email: '',
      city: '',
      message: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmitPress = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await submitPartnerRegistration({
        fullName: values.fullName,
        contactPerson: values.contactPerson,
        phone: values.phone,
        email: values.email,
        city: values.city,
        message: values.message,
      });
      navigation.navigate('Success', {
        message: `Thank you for your interest!\n\nWe'll review your partner application and contact you on ${values.phone} within 2 business days.`,
        returnTo: 'MainDrawer',
      });
    } catch {
      Alert.alert('Submission Failed', 'Please try again or call us on 022-66661314.');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <ScreenContainer scrollEnabled={true} keyboardAvoiding={true} backgroundColor={colors.background}>
      <AppHeader
        title="Partner Us"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Partner Registration Form" />

      <View style={styles.imageContainer}>
        <FeatureImage sourceUrl="https://www.anydomestichelp.com/images/part.jpg" />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Full Name / Organization Name"
              required={true}
              placeholder="Enter full name or organization name"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.fullName?.message}
              prefixIcon="🏢"
            />
          )}
        />

        <Controller
          control={control}
          name="contactPerson"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Contact Person Name"
              required={true}
              placeholder="Enter contact person name"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.contactPerson?.message}
              prefixIcon="👤"
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <PhoneInputField
              label="Phone Number"
              required={true}
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <EmailInputField
              label="E-Mail Id"
              required={true}
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="City"
              required={true}
              placeholder="Enter your city"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.city?.message}
              prefixIcon="📍"
            />
          )}
        />

        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, value } }) => (
            <MultilineInputField
              label="Proposed Details / Remarks"
              placeholder="Enter details of your proposal"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.message?.message}
              maxLength={500}
            />
          )}
        />

        <PrimaryButton
          label="Register as Partner"
          onPress={onSubmitPress}
          loading={submitting}
          disabled={submitting}
          style={styles.submitBtn}
          icon="🤝"
        />
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />

      <LoadingSpinner visible={submitting} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
  },
  form: {
    marginTop: spacing.md,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  otpNote: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.screenHorizontalPadding,
  },
});

export default PartnerUsScreen;
