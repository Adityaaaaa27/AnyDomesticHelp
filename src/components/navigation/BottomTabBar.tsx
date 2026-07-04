import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface BottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TAB_ICONS: Record<string, string> = {
  HomeTab: '🏠',
  ServicesTab: '📋',
  ProfilesTab: '👥',
  ContactTab: '📞',
  MoreTab: '•••',
};

const TAB_LABELS: Record<string, string> = {
  HomeTab: 'Home',
  ServicesTab: 'Services',
  ProfilesTab: 'Profiles',
  ContactTab: 'Contact',
  MoreTab: 'More',
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
                <Text style={[styles.iconText, isFocused && styles.activeIconText]}>
                  {TAB_ICONS[route.name] || '❓'}
                </Text>
              </View>
              <Text style={[styles.labelText, isFocused && styles.activeLabelText]}>
                {TAB_LABELS[route.name] || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.tabBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  container: {
    flexDirection: 'row',
    height: spacing.tabBarHeight,
    backgroundColor: colors.tabBackground,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  activeIconContainer: {
    backgroundColor: colors.primaryLight,
  },
  iconText: {
    fontSize: 20,
    color: colors.tabInactive,
  },
  activeIconText: {
    color: colors.primary,
  },
  labelText: {
    fontSize: typography.fontSize.tab,
    fontWeight: typography.fontWeight.medium,
    color: colors.tabInactive,
    marginTop: 2,
  },
  activeLabelText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});

export default BottomTabBar;
