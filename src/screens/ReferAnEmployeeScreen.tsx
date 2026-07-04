import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import TextInputField from '../components/forms/TextInputField';
import PhoneInputField from '../components/forms/PhoneInputField';
import StandardDropdown from '../components/forms/StandardDropdown';
import SearchableDropdown from '../components/forms/SearchableDropdown';
import PrimaryButton from '../components/buttons/PrimaryButton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import FooterComponent from '../components/layout/FooterComponent';
import FeatureImage from '../components/media/FeatureImage';
import { referEmployeeSchema, ReferEmployeeFormData } from '../utils/validation';
import { submitReferEmployee } from '../api/referEmployee';
import { JOB_CATEGORIES } from '../constants/jobCategories';
import { CITIES } from '../constants/cities';
import colors from '../constants/colors';
import spacing from '../constants/spacing';

const ReferAnEmployeeScreen: React.FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferEmployeeFormData>({
    resolver: yupResolver(referEmployeeSchema) as any,
    defaultValues: {
      jobCategory: '',
      name: '',
      phone: '',
      experience: '',
      city: '',
      message: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const result = await submitReferEmployee(data);
    setLoading(false);

    if (result.success) {
      navigation.navigate('Success', {
        message: 'Thank you for referring! The employee details have been registered.',
        returnTo: 'MainDrawer',
      });
    } else {
      Alert.alert('Submission Failed', result.message);
    }
  };

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

      <LoadingSpinner visible={loading} />

      <View style={styles.form}>
        <Controller
          control={control}
          name="jobCategory"
          render={({ field: { onChange, value } }) => (
            <StandardDropdown
              label="Job Required"
              required={true}
              options={JOB_CATEGORIES}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.jobCategory?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Employee Name"
              required={true}
              placeholder="Enter employee name"
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
          name="experience"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Years of Experience"
              placeholder="Enter years (e.g. 5)"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.experience?.message}
              prefixIcon="⏱"
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <SearchableDropdown
              label="Preferred City"
              options={CITIES}
              selectedValue={value || ''}
              onValueChange={onChange}
              error={errors.city?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Additional Remarks"
              placeholder="Any other details (optional)"
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
          label="Submit Employee Details"
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

export default ReferAnEmployeeScreen;
