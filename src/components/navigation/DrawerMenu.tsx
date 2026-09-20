import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';
import { useLanguage } from '../../context/LanguageContext';

interface DrawerMenuProps {
  navigation: any;
  state: any;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ navigation, state }) => {
  const { t } = useLanguage();
  // Get active route index or name
  const currentRouteName = state?.routeNames[state.index];

  const DRAWER_ITEMS = [
    { label: t.home, route: 'Home' },
    { label: t.howItWorks, route: 'HowItWorks' },
    { label: t.aboutUs, route: 'AboutUs' },
    { label: t.partnerUs, route: 'PartnerUs' },
    { label: t.referEmployee, route: 'ReferAnEmployee' },
    { label: t.contactUs, route: 'Contact' },
    { label: t.faq, route: 'FAQ' },
    { label: t.managementTeam, route: 'ManagementTeam' },
    { label: t.privacyPolicy, route: 'PrivacyPolicy' },
    { label: t.termsConditions, route: 'TermsAndConditions' },
    { label: t.refundCancellation, route: 'RefundCancellation' },
  ];

  const handleNavigate = (route: string) => {
    navigation.closeDrawer();
    try {
      navigation.navigate(route);
    } catch {
      navigation.getParent()?.navigate(route);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.appName}</Text>
        <Text style={styles.headerSubtitle}>Mumbai's Manpower Agency</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {DRAWER_ITEMS.map((item) => {
          const isActive = currentRouteName === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.item, isActive && styles.activeItem]}
              onPress={() => handleNavigate(item.route)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${item.label}`}
            >
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <Text style={styles.footerText}>© 2024 Any Domestic Help</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.caption,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  scrollContent: {
    paddingVertical: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: spacing.minTouchTarget,
  },
  activeItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.md,
    width: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.footerText,
  },
  activeLabel: {
    color: colors.textGold,
    fontWeight: typography.fontWeight.bold,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.caption,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 2,
  },
});

export default DrawerMenu;
