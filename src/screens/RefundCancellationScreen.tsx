import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import FooterComponent from '../components/layout/FooterComponent';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const RefundCancellationScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="Refund / Cancel"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Refund and Cancellation" />

      <View style={styles.contentCard}>
        <Text style={styles.question}>What is your refund and cancellation policy?</Text>
        <Text style={styles.question}>Is there any refund currently available?</Text>

        <View style={styles.alertBox}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.answerText}>
            Currently <Text style={styles.boldText}>Any Domestic Help</Text> does not have any refund policy.
          </Text>
        </View>

        <Text style={styles.detailsText}>
          Please read our Terms and Conditions carefully before registering or making any payment. Once a service registration or placement is finalized, no refunds will be issued under any circumstances.
        </Text>
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  question: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.body,
    marginBottom: spacing.xs,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: colors.error + '10',
    borderColor: colors.error,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  answerText: {
    flex: 1,
    fontSize: typography.fontSize.body,
    color: colors.error,
    fontWeight: typography.fontWeight.semibold,
  },
  boldText: {
    fontWeight: typography.fontWeight.extrabold,
  },
  detailsText: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
  },
});

export default RefundCancellationScreen;
