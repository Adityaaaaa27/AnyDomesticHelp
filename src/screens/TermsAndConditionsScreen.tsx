import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import TabButton from '../components/buttons/TabButton';
import FooterComponent from '../components/layout/FooterComponent';
import { EMPLOYEE_TERMS, EMPLOYER_TERMS } from '../constants/termsAndConditions';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const TermsAndConditionsScreen: React.FC<any> = ({ route, navigation }) => {
  const defaultTab = route.params?.defaultTab || 'employer';
  const [activeTab, setActiveTab] = useState<'employee' | 'employer'>(defaultTab);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleTabChange = (tab: 'employee' | 'employer') => {
    setActiveTab(tab);
    // Scroll to top when changing tabs
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const currentClauses = activeTab === 'employee' ? EMPLOYEE_TERMS : EMPLOYER_TERMS;

  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="Terms & Conditions"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading title="Terms and Conditions" />

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TabButton
          label="Employer Terms"
          active={activeTab === 'employer'}
          onPress={() => handleTabChange('employer')}
        />
        <TabButton
          label="Employee Terms"
          active={activeTab === 'employee'}
          onPress={() => handleTabChange('employee')}
        />
      </View>

      {/* Clauses container */}
      <ScrollView ref={scrollViewRef} scrollEnabled={false} style={styles.clausesContainer}>
        {currentClauses.map((clause) => (
          <View key={clause.number} style={styles.clauseRow}>
            <Text style={styles.clauseNumber}>{clause.number}.</Text>
            <Text style={styles.clauseText}>{clause.text}</Text>
          </View>
        ))}
      </ScrollView>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundGrey,
    borderRadius: 24,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.lg,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clausesContainer: {
    paddingHorizontal: spacing.screenHorizontalPadding,
  },
  clauseRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  clauseNumber: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginRight: spacing.sm,
    width: 24,
  },
  clauseText: {
    flex: 1,
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.body,
  },
});

export default TermsAndConditionsScreen;
