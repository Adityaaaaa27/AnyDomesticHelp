import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import PrimaryButton from '../components/buttons/PrimaryButton';
import ServiceEmojiButton from '../components/buttons/ServiceEmojiButton';
import ImageCarousel from '../components/media/ImageCarousel';
import HomeProfilePreviewCard from '../components/cards/HomeProfilePreviewCard';
import FooterComponent from '../components/layout/FooterComponent';
import { SERVICES, CAROUSEL_SERVICES, CAROUSEL_IMAGES, Service, ServiceKey } from '../constants/services';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const carouselItems = CAROUSEL_SERVICES.map((key: ServiceKey) => {
    const data = CAROUSEL_IMAGES[key];
    return {
      key,
      label: data.label,
      imageUrl: data.image,
    };
  });

  const handleServiceSelect = (key: string, label: string) => {
    navigation.navigate('EmployerRegistration', { serviceKey: key, serviceLabel: label });
  };

  const handleNavigate = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader onMenuPress={() => navigation.openDrawer()} />

      <View style={styles.heroSection}>
        <Text style={styles.heroGreeting}>Hi 👋</Text>
        <Text style={styles.heroTitle}>
          Find the perfect <Text style={styles.heroAccent}>Helper</Text> for your home
        </Text>
      </View>

      <SectionHeading title="What services are you looking for?" />

      {/* Grid of services */}
      <View style={styles.gridContainer}>
        {SERVICES.map((item: Service) => (
          <View key={item.key} style={styles.gridItem}>
            <ServiceEmojiButton
              emoji={item.emoji}
              label={item.label}
              bgColor={item.bgColor}
              onPress={() => handleServiceSelect(item.key, item.label)}
            />
          </View>
        ))}
      </View>

      {/* Image Carousel */}
      <ImageCarousel
        items={carouselItems}
        onItemPress={(key, label) => handleServiceSelect(key, label)}
      />

      {/* Company Overview section */}
      <View style={styles.aboutCard}>
        <Text style={styles.aboutHeading}>About Any Domestic Help</Text>
        <Text style={styles.aboutText}>
          We are India's most trusted platform for connecting households with verified domestic professionals. From caring babysitters to skilled cooks, our mission is to provide reliable, professional, and accessible domestic support to enhance your quality of life. Every provider is background-checked to ensure the safety and peace of mind of your family.
        </Text>
      </View>

      {/* Employee Profiles Preview */}
      <View style={styles.previewHeader}>
        <Text style={styles.previewTitle}>Few Employee Profiles</Text>
        <Text
          style={styles.moreLink}
          onPress={() => navigation.navigate('EmployeeProfiles', { page: 1 })}
        >
          More ›
        </Text>
      </View>

      <HomeProfilePreviewCard
        name="Sunita Verma"
        jobCategory="Professional Babysitter"
        imageUrl="https://www.anydomestichelp.com/images/img33.jpg"
        onPressMore={() => navigation.navigate('EmployeeProfiles', { page: 1 })}
      />

      {/* Feedback CTA Card */}
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackTitle}>Feedback</Text>
        <Text style={styles.feedbackSubtitle}>
          How was your experience with our domestic helpers? Your feedback helps us maintain high standards of service.
        </Text>
        <PrimaryButton
          label="Share Your Feedback"
          onPress={() => navigation.navigate('Feedback')}
          style={styles.feedbackBtn}
        />
      </View>

      <FooterComponent onNavigate={handleNavigate} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  heroGreeting: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
  heroTitle: {
    fontSize: typography.fontSize.h1 - 2,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.h1 - 2,
    marginTop: spacing.xs,
  },
  heroAccent: {
    color: colors.primary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.screenHorizontalPadding - 4,
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  gridItem: {
    width: '24%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  aboutCard: {
    backgroundColor: colors.primaryLight + '50',
    padding: spacing.lg,
    borderRadius: spacing.cardBorderRadius,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.lg,
  },
  aboutHeading: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  aboutText: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.sm,
  },
  previewTitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  moreLink: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  feedbackCard: {
    backgroundColor: colors.primary,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.sm,
  },
  feedbackSubtitle: {
    fontSize: typography.fontSize.caption + 1,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  feedbackBtn: {
    backgroundColor: colors.cardBackground,
    width: '85%',
  },
});

export default HomeScreen;
