import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import ContentParagraph from '../components/layout/ContentParagraph';
import BulletList from '../components/layout/BulletList';
import FeatureImage from '../components/media/FeatureImage';
import FooterComponent from '../components/layout/FooterComponent';
import { callPhone } from '../utils/deepLinks';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const VALUE_DELIVERED = [
  'A complete professional approach.',
  'Sense of responsibility and care.',
  'Affordable charges and multiple payment options.',
  'Hassle free replacement.',
  'Sound management team.',
  '24 x 7 call centre support.',
];

const HowItWorksScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="How It Works"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="How Any Domestic Help Works" />

      <View style={styles.imageContainer}>
        <FeatureImage sourceUrl="https://www.anydomestichelp.com/images/1.jpeg" />
      </View>

      <ContentParagraph>
        An employer has to first create a login and password at{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('MainDrawer')}
        >
          www.anydomestichelp.com
        </Text>{' '}
        and then fill up the employer registration form after which our call centre will get in touch with you.
      </ContentParagraph>

      <ContentParagraph>
        An employer can also call us on{' '}
        <Text style={styles.boldPhone} onPress={() => callPhone('022-66661314')}>
          022-66661314
        </Text>{' '}
        from anywhere in the world and connect directly with our call centre.
      </ContentParagraph>

      <ContentParagraph>
        For further information, we also have an{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('FAQ')}
        >
          FAQ
        </Text>{' '}
        section on our website.
      </ContentParagraph>

      <SectionHeading title="Value we deliver" />

      <BulletList items={VALUE_DELIVERED} />

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.md,
  },
  linkText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    textDecorationLine: 'underline',
  },
  boldPhone: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});

export default HowItWorksScreen;
