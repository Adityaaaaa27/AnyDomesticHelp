import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import FeatureImage from '../components/media/FeatureImage';
import FooterComponent from '../components/layout/FooterComponent';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const ManagementTeamScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="Management"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Management Team" />

      <View style={styles.imageContainer}>
        <FeatureImage
          sourceUrl="https://www.anydomestichelp.com/images/teammgmt.jpg"
          aspectRatio={1.5}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Professional Placement Leadership</Text>
        <Text style={styles.description}>
          Our leadership team consists of seasoned HR professionals and technologists who are passionate about reforming the domestic placement sector in India. By bridging the gap between verified workers and households, we create a secure, reliable, and smooth ecosystem for everyone involved.
        </Text>
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
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
  },
});

export default ManagementTeamScreen;
