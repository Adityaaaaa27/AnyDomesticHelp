// src/screens/FeedbackScreen.tsx
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
import StandardDropdown from '../components/forms/StandardDropdown';
import MultilineInputField from '../components/forms/MultilineInputField';
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import FeatureImage from '../components/media/FeatureImage';

import { submitFeedback } from '../services/apiService';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const MAX_FEEDBACK_LENGTH = 500;

const RATING_OPTIONS = [
  { label: "⭐⭐⭐⭐⭐  Excellent",  value: "5" },
  { label: "⭐⭐⭐⭐    Good",       value: "4" },
  { label: "⭐⭐⭐       Average",    value: "3" },
  { label: "⭐⭐          Poor",      value: "2" },
  { label: "⭐             Very Poor", value: "1" }
];

const schema = yup.object({
  name:     yup.string().min(2, 'Min 2 characters').required('Your name is required'),
  phone:    yup.string()
               .optional()
               .test('phone-valid', 'Enter valid 10-digit mobile number', (value) => {
                 if (!value || value.length === 0) return true;
                 return /^[6-9]\d{9}$/.test(value);
               }),
  email:    yup.string().optional().email('Enter valid email'),
  rating:   yup.string().required('Rating is required'),
  feedback: yup.string().min(10, 'Min 10 characters').max(MAX_FEEDBACK_LENGTH, 'Max 500 characters').required('Feedback is required'),
});
type FormValues = yup.InferType<typeof schema>;

const FeedbackScreen: React.FC<any> = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      rating: '5',
      feedback: '',
    },
  });

  const feedbackText = watch('feedback', '');

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const ratingVal = parseInt(values.rating, 10) || 5;
      const ratingOption = RATING_OPTIONS.find(r => r.value === values.rating);
      await submitFeedback({
        name:        values.name,
        phone:       values.phone || undefined,
        email:       values.email || undefined,
        rating:      ratingVal,
        ratingLabel: ratingOption?.label.replace(/⭐/g, '').trim() ?? 'Excellent',
        message:     values.feedback,
      });
      navigation.navigate('Success', {
        message: 'Thank you for your feedback!\n\nIt helps us serve you better.',
        returnTo: 'MainDrawer',
      });
    } catch {
      Alert.alert('Error', 'Could not submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <ScreenContainer scrollEnabled={true} keyboardAvoiding={true} backgroundColor={colors.background}>
      <AppHeader
        title="Feedback"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Feedback Form" />

      <View style={styles.imageContainer}>
        <FeatureImage sourceUrl="https://www.anydomestichelp.com/images/ff.jpg" />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Your Name"
              required={true}
              placeholder="Enter full name"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.name?.message}
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
              label="Email"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <StandardDropdown
              label="Rating"
              required={true}
              options={RATING_OPTIONS}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.rating?.message}
              prefixIcon="⭐"
            />
          )}
        />

        <Controller
          control={control}
          name="feedback"
          render={({ field: { onChange, value } }) => (
            <MultilineInputField
              label="Your Feedback"
              required={true}
              placeholder="Tell us how we did"
              onChangeText={onChange}
              value={value ?? ''}
              error={errors.feedback?.message}
              maxLength={MAX_FEEDBACK_LENGTH}
              showCounter={true}
            />
          )}
        />

        <PrimaryButton
          label="Submit Feedback"
          onPress={onSubmit}
          loading={submitting}
          disabled={submitting}
          style={styles.submitBtn}
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
});

export default FeedbackScreen;
