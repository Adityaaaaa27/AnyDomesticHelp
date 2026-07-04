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
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import FeatureImage from '../components/media/FeatureImage';
import { partnerRegistrationSchema, PartnerRegistrationFormData } from '../utils/validation';
import { submitPartnerRegistration } from '../api/partnerRegistration';
import { CITIES } from '../constants/cities';
import colors from '../constants/colors';
import spacing from '../constants/spacing';

const PartnerUsScreen: React.FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerRegistrationFormData>({
    resolver: yupResolver(partnerRegistrationSchema) as any,
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const result = await submitPartnerRegistration(data);
    setLoading(false);

    if (result.success) {
      navigation.navigate('Success', {
        message: 'Thank you for your interest! Our team will get back to you shortly.',
        returnTo: 'MainDrawer',
      });
    } else {
      Alert.alert('Submission Failed', result.message);
    }
  };

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

      <LoadingSpinner visible={loading} />

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Contact Person Name"
              required={true}
              placeholder="Enter contact person name"
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
          name="company"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Company / Organisation Name"
              placeholder="Enter company name (optional)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.company?.message}
              prefixIcon="🏢"
            />
          )}
        />

        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Proposed Details / Remarks"
              placeholder="Enter details of your proposal"
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
          label="Submit Registration"
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
});

export default PartnerUsScreen;
