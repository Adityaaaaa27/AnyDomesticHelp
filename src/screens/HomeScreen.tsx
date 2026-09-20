import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import AppHeader from '../components/navigation/AppHeader';
import ScreenContainer from '../components/layout/ScreenContainer';
import HeroCarousel from '../components/home/HeroCarousel';
import { SERVICES, CAROUSEL_SERVICES, CAROUSEL_IMAGES, Service, ServiceKey } from '../constants/services';
import { EMPLOYEE_PROFILES } from '../constants/employeeProfiles';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';
import { useLanguage } from '../context/LanguageContext';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { t, language } = useLanguage();

  const handleServiceSelect = (key: string, label: string) => {
    navigation.navigate('EmployerRegistration', { serviceKey: key, serviceLabel: label });
  };

  const handleNavigate = (route: string) => {
    navigation.navigate(route);
  };

  const featuredProfiles = EMPLOYEE_PROFILES.slice(0, 5);

  return (
    <ScreenContainer scrollEnabled={false} backgroundColor={colors.background}>
      <AppHeader onMenuPress={() => navigation.openDrawer()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ANIMATED HERO CAROUSEL SLIDER */}
        <HeroCarousel onSelectService={handleServiceSelect} />

        {/* OUR SERVICES - AESTHETIC HORIZONTAL BARS */}
        <View style={[styles.sectionHeader, { marginTop: spacing.xl }]}>
          <Text style={styles.sectionTitle}>{t.ourServices}</Text>
        </View>
        <View style={styles.servicesList}>
          {SERVICES.map((item: Service) => {
            const displayLabel = language === 'hi' && item.labelHi ? item.labelHi : item.label;
            const displayDesc = language === 'hi' && item.descHi ? item.descHi : item.desc;

            return (
              <TouchableOpacity 
                key={item.key} 
                style={styles.serviceBar}
                activeOpacity={0.75}
                onPress={() => handleServiceSelect(item.key, item.label)}
              >
                {/* Left: Real High-Definition Photo */}
                <View style={styles.serviceBarImageContainer}>
                  <Image 
                    source={{ uri: item.imageUrl }} 
                    style={styles.serviceBarImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Right / Center: Title + Short Aesthetic Description */}
                <View style={styles.serviceBarTextContainer}>
                  <Text style={styles.serviceBarTitle}>{displayLabel}</Text>
                  <Text style={styles.serviceBarDesc} numberOfLines={2}>
                    {displayDesc}
                  </Text>
                </View>

                {/* Right Arrow Pill */}
                <View style={styles.serviceBarArrowWrapper}>
                  <Text style={styles.serviceBarArrow}>→</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FEATURED PROFILES */}
        <View style={[styles.sectionHeader, { marginTop: spacing.lg }]}>
          <Text style={styles.sectionTitle}>{t.featuredProfiles}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EmployeeProfiles', { page: 1 })}>
            <Text style={styles.viewAllText}>{t.seeAll}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.profilesScroll}>
          {featuredProfiles.map((profile) => (
             <TouchableOpacity 
               key={profile.id} 
               style={styles.profileCard} 
               activeOpacity={0.9}
               onPress={() => navigation.navigate('EmployeeProfiles', { page: 1 })}
             >
               <View style={styles.profileHeader}>
                 <Image source={{uri: profile.imageUrl}} style={styles.profileImage} />
                 <View style={styles.ratingBadge}>
                   <Text style={styles.ratingText}>★ 4.8</Text>
                 </View>
               </View>
               <View style={styles.profileDetails}>
                 <Text style={styles.profileName}>{profile.name}</Text>
                 <Text style={styles.profileRole}>{profile.jobCategory}</Text>
                 <View style={styles.profileDivider} />
                 <Text style={styles.profileExp}>{profile.experience} • Mumbai</Text>
               </View>
             </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{height: 60}} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Cream #F6F4EE
  },
  scrollContent: {
    paddingBottom: 40,
  },
  trustBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.screenHorizontalPadding,
    marginTop: 24,
    marginBottom: 32,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustIcon: {
    fontSize: 16,
  },
  trustText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
  trustDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilyHeading,
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  servicesList: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    gap: 12,
  },
  serviceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C4D7CD', // Darker teal green aesthetic card
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  serviceBarImageContainer: {
    width: 76,
    height: 76,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.backgroundGrey,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  serviceBarImage: {
    width: '100%',
    height: '100%',
  },
  serviceBarTextContainer: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
    justifyContent: 'center',
  },
  serviceBarTitle: {
    fontSize: 16,
    fontFamily: typography.fontFamilyHeading,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  serviceBarDesc: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  serviceBarArrowWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceBarArrow: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  profilesScroll: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    gap: 16,
  },
  profileCard: {
    width: 240,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.backgroundGrey,
  },
  ratingBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  profileDetails: {},
  profileName: {
    fontFamily: typography.fontFamilyHeading,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: 12,
  },
  profileDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 12,
  },
  profileExp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
