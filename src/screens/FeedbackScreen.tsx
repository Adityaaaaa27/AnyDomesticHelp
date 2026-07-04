import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import TextInputField from '../components/forms/TextInputField';
import PhoneInputField from '../components/forms/PhoneInputField';
import EmailInputField from '../components/forms/EmailInputField';
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import FeatureImage from '../components/media/FeatureImage';
import { feedbackSchema, FeedbackFormData } from '../utils/validation';
import { submitFeedback } from '../api/feedback';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const FeedbackScreen: React.FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState('5');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: yupResolver(feedbackSchema) as any,
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      rating: '5',
      message: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    // Bind rating
    data.rating = rating;
    const result = await submitFeedback(data);
    setLoading(false);

    if (result.success) {
      navigation.navigate('Success', {
        message: 'Thank you for your feedback! We appreciate your support.',
        returnTo: 'MainDrawer',
      });
    } else {
      Alert.alert('Submission Failed', result.message);
    }
  };

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

      <LoadingSpinner visible={loading} />

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Full Name"
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

        {/* Custom Star Rating Selector */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rate Our Service</Text>
          <View style={styles.starsRow}>
            {['1', '2', '3', '4', '5'].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starTouch}
              >
                <Text
                  style={[
                    styles.starIcon,
                    parseInt(star, 10) <= parseInt(rating, 10) && styles.activeStar,
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Feedback Remarks / Messages"
              required={true}
              placeholder="Tell us how we did"
              multiline={true}
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.message?.message}
              prefixIcon="📝"
              style={styles.textArea}
            />
          )}
        />

        <PrimaryButton
          label="Submit Feedback"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
        />
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
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
  ratingContainer: {
    marginBottom: spacing.formFieldGap,
    paddingHorizontal: spacing.screenHorizontalPadding,
  },
  ratingLabel: {
    fontSize: typography.fontSize.label,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  starTouch: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 32,
    color: colors.border,
  },
  activeStar: {
    color: colors.ratingGold,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
});

export default FeedbackScreen;
