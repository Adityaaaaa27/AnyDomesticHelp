import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import ContentParagraph from '../components/layout/ContentParagraph';
import BulletList from '../components/layout/BulletList';
import FeatureImage from '../components/media/FeatureImage';
import FooterComponent from '../components/layout/FooterComponent';
import colors from '../constants/colors';
import spacing from '../constants/spacing';

const ENDEAVOURS = [
  'Complete solution under one roof.',
  'Creating value for our clients.',
  'Well trained and experienced Customer Care Staff.',
  'Professional approach.',
  'Using technology to create proximity between Employer\'s and Employee\'s workplace.',
];

const AboutUsScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="About Us"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="About Us" />

      <View style={styles.imageContainer}>
        <FeatureImage sourceUrl="https://www.anydomestichelp.com/images/2.jpeg" />
      </View>

      <SectionHeading title="Mission" />
      <ContentParagraph>
        Our mission is to provide you with a service experience unmatched by any other organization.
      </ContentParagraph>

      <SectionHeading title="Vision" />
      <ContentParagraph>
        Our vision is to be the most competent and innovative organization by making the difference through our people, consisting of a team of dedicated professionals who value customers, deliver on promises and contribute to sustainable development.
      </ContentParagraph>

      <SectionHeading title="Our Endeavour" />
      <BulletList items={ENDEAVOURS} />

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
  },
});

export default AboutUsScreen;
