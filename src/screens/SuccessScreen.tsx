import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import PrimaryButton from '../components/buttons/PrimaryButton';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const SuccessScreen: React.FC<any> = ({ route, navigation }) => {
  const { message = 'Registration submitted successfully!', returnTo = 'MainDrawer' } = route.params || {};

  const handleReturn = () => {
    // Navigate back to the target screen and reset/clear stack if possible
    navigation.navigate(returnTo);
  };

  return (
    <ScreenContainer scrollEnabled={false} backgroundColor={colors.background} contentContainerStyle={styles.center}>
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.successTitle}>Success!</Text>
        <Text style={styles.successMessage}>{message}</Text>

        <PrimaryButton
          label="Go Back to Home"
          onPress={handleReturn}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successIcon: {
    fontSize: 40,
    color: colors.success,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  successMessage: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.body,
    marginBottom: spacing.xxl,
  },
  button: {
    width: '100%',
  },
});

export default SuccessScreen;
