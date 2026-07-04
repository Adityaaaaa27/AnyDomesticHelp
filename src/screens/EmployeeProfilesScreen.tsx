import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import AppHeader from '../components/navigation/AppHeader';
import SectionHeading from '../components/layout/SectionHeading';
import EmployeeProfileCard from '../components/cards/EmployeeProfileCard';
import PaginationButton from '../components/buttons/PaginationButton';
import FooterComponent from '../components/layout/FooterComponent';
import { EMPLOYEE_PROFILES, TOTAL_PAGES, getProfilesByPage } from '../constants/employeeProfiles';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import typography from '../constants/typography';

const CATEGORIES = ['All', 'Nurse', 'Babysitter', 'Housemaid'];

const EmployeeProfilesScreen: React.FC<any> = ({ route, navigation }) => {
  const initialPage = route.params?.page || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (route.params?.page) {
      setCurrentPage(route.params.page);
    }
  }, [route.params?.page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
    }
  };

  // Get profiles for the current page
  const pageProfiles = EMPLOYEE_PROFILES.filter((p) => p.page === currentPage);

  // Filter profiles based on selected category tab
  const filteredProfiles = selectedCategory === 'All'
    ? pageProfiles
    : pageProfiles.filter((p) => p.jobCategory.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <ScreenContainer scrollEnabled={true} backgroundColor={colors.background}>
      <AppHeader
        title="Profiles"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => navigation.openDrawer()}
      />

      <SectionHeading
        title="Few Employee Profiles"
        subtitle="Find highly reliable and verified professionals for your home needs."
      />

      {/* Category filter tabs */}
      <View style={styles.tabContainer}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[styles.tabItem, isSelected && styles.activeTabItem]}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isSelected && styles.activeTabText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.tabListContent}
        />
      </View>

      {/* Profile list */}
      <View style={styles.listContainer}>
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((item) => (
            <EmployeeProfileCard
              key={item.id}
              name={item.name}
              jobCategory={item.jobCategory}
              experience={item.experience}
              gender={item.gender}
              timing={item.timing}
              salary={item.salary}
              imageUrl={item.imageUrl}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>👥</Text>
            <Text style={styles.emptyStateText}>No profiles available in this category on this page.</Text>
          </View>
        )}
      </View>

      {/* Pagination Row */}
      <View style={styles.paginationRow}>
        <PaginationButton
          label="‹"
          direction="previous"
          disabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
        />

        {/* Page indicators */}
        <View style={styles.pageNumbers}>
          {Array.from({ length: TOTAL_PAGES }).map((_, index) => {
            const pageNum = index + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <TouchableOpacity
                key={pageNum}
                onPress={() => handlePageChange(pageNum)}
                style={[styles.pageNumBox, isCurrent && styles.activePageNumBox]}
              >
                <Text style={[styles.pageNumText, isCurrent && styles.activePageNumText]}>
                  {pageNum}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <PaginationButton
          label="Next ››"
          direction="next"
          disabled={currentPage === TOTAL_PAGES}
          onPress={() => handlePageChange(currentPage + 1)}
        />
      </View>

      {/* Floating Action Button (Refer Employee) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ReferAnEmployee')}
        accessibilityRole="button"
        accessibilityLabel="Refer an employee"
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <FooterComponent onNavigate={(route) => navigation.navigate(route)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginBottom: spacing.md,
  },
  tabListContent: {
    paddingHorizontal: spacing.screenHorizontalPadding,
    gap: spacing.sm,
  },
  tabItem: {
    paddingHorizontal: spacing.md + 4,
    paddingVertical: spacing.sm - 2,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '30',
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: spacing.minTouchTarget - 8,
    justifyContent: 'center',
  },
  activeTabItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.textWhite,
  },
  listContainer: {
    minHeight: 200,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyStateIcon: {
    fontSize: 40,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginVertical: spacing.lg,
  },
  pageNumbers: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  pageNumBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryLight + '20',
  },
  activePageNumBox: {
    backgroundColor: colors.primary,
  },
  pageNumText: {
    fontSize: typography.fontSize.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  activePageNumText: {
    color: colors.textWhite,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10,
  },
  fabIcon: {
    fontSize: 28,
    color: colors.textWhite,
    fontWeight: 'bold',
  },
});

export default EmployeeProfilesScreen;
