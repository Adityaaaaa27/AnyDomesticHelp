import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import ContentParagraph from '../components/layout/ContentParagraph';
import FooterComponent from '../components/layout/FooterComponent';
import { PRIVACY_POLICY_SECTIONS } from '../constants/privacyPolicy';
import colors from '../constants/colors';
import spacing from '../constants/spacing';

const PrivacyPolicyScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="Privacy Policy"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Privacy Policy" />

      <View style={styles.content}>
        {PRIVACY_POLICY_SECTIONS.map((section, index) => (
          <View key={index} style={styles.section}>
            <SectionHeading title={section.title} />
            {section.paragraphs.map((paragraph, pIndex) => (
              <ContentParagraph key={pIndex}>{paragraph}</ContentParagraph>
            ))}
          </View>
        ))}
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.xs,
  },
});

export default PrivacyPolicyScreen;
