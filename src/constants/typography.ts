import { Platform } from 'react-native';

const typography = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }) as string,

  fontFamilyBold: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }) as string,

  fontSize: {
    h1: 28,
    h2: 22,
    h3: 18,
    body: 15,
    bodySmall: 14,
    caption: 12,
    button: 16,
    buttonSmall: 14,
    label: 14,
    error: 12,
    tab: 11,
    badge: 10,
    sectionTitle: 20,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeight: {
    h1: 36,
    h2: 30,
    h3: 26,
    body: 24,
    bodySmall: 22,
    caption: 18,
    button: 22,
    label: 20,
    error: 16,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    heading: 0.3,
  },
} as const;

export default typography;
