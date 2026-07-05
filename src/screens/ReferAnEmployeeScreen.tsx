// src/screens/ReferAnEmployeeScreen.tsx
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
import StandardDropdown from '../components/forms/StandardDropdown';
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import FeatureImage from '../components/media/FeatureImage';

import { submitEmployeeReferral } from '../services/apiService';
import { JOB_CATEGORIES } from '../constants/jobCategories';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

const schema = yup.object({
  jobCategory:  yup.string().required('Please select job category'),
  employeeName: yup.string().min(2, 'Min 2 characters').required('Employee name is required'),
  referrerPhone: yup.string()
                    .matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number')
                    .required('Referrer phone number is required'),
  location:     yup.string().optional(),
  experience:   yup.string().optional(),
  gender:       yup.string().optional(),
});
type FormValues = yup.InferType<typeof schema>;

const ReferAnEmployeeScreen: React.FC<any> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      jobCategory: '',
      employeeName: '',
      referrerPhone: '',
      location: '',
      experience: '',
      gender: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmitPress = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await submitEmployeeReferral({
        jobCategory: values.jobCategory,
        employeeName: values.employeeName,
        referrerPhone: values.referrerPhone,
        location: values.location,
        experience: values.experience,
        gender: values.gender,
      });
      navigation.navigate('Success', {
        message: `Thank you for the referral!\n\nWe will review the employee details and get back to you on ${values.referrerPhone}.`,
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
        title="Refer Employee"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Employee Details" />

      <View style={styles.imageContainer}>
        <FeatureImage sourceUrl="https://www.anydomestichelp.com/images/kaam.jpg" />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="jobCategory"
          render={({ field: { onChange, value } }) => (
            <StandardDropdown
              label="Job Required"
              required={true}
              options={JOB_CATEGORIES.filter(opt => opt.value !== '')}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.jobCategory?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="employeeName"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Employee Name"
              required={true}
              placeholder="Enter employee name"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.employeeName?.message}
              prefixIcon="👤"
            />
          )}
        />

        <Controller
          control={control}
          name="referrerPhone"
          render={({ field: { onChange, value } }) => (
            <PhoneInputField
              label="Your Phone Number — we will verify this"
              required={true}
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.referrerPhone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Employee Location / Area"
              placeholder="Enter area or locality"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.location?.message}
              prefixIcon="📍"
            />
          )}
        />

        <Controller
          control={control}
          name="experience"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Years of Experience"
              placeholder="e.g. 3 years"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.experience?.message}
              prefixIcon="⏱"
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <StandardDropdown
              label="Gender"
              options={GENDER_OPTIONS}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.gender?.message}
              placeholder="Select gender"
              prefixIcon="👥"
            />
          )}
        />

        <PrimaryButton
          label="Refer Employee"
          onPress={onSubmitPress}
          loading={submitting}
          disabled={submitting}
          style={styles.submitBtn}
          icon="👥"
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

export default ReferAnEmployeeScreen;
