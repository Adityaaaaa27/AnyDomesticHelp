import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import Accordion from '../components/layout/Accordion';
import FooterComponent from '../components/layout/FooterComponent';
import { FAQ_DATA } from '../constants/faqData';
import colors from '../constants/colors';
import spacing from '../constants/spacing';

const FAQScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="FAQ"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Frequently Asked Questions" />

      <View style={styles.list}>
        {FAQ_DATA.map((faq) => (
          <Accordion
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </View>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: spacing.sm,
  },
});

export default FAQScreen;
