import { Platform } from 'react-native';

const typography = {
  // Body & General Sans-Serif Font (Inter)
  fontFamily: Platform.select({
    ios: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    android: 'Inter, Roboto, sans-serif',
    default: 'Inter, system-ui, -apple-system, sans-serif',
  }) as string,

  // Display / Heading Serif Font (Fraunces)
  fontFamilyHeading: Platform.select({
    ios: 'Fraunces, Georgia, "Times New Roman", serif',
    android: 'Fraunces, serif',
    default: 'Fraunces, Georgia, serif',
  }) as string,

  fontFamilyBold: Platform.select({
    ios: 'Inter, -apple-system, sans-serif',
    android: 'Inter, Roboto, sans-serif',
    default: 'Inter, sans-serif',
  }) as string,

  // Monospace Font (IBM Plex Mono)
  fontFamilyMono: Platform.select({
    ios: 'IBM Plex Mono, Menlo, Courier, monospace',
    android: 'IBM Plex Mono, monospace',
    default: 'IBM Plex Mono, monospace',
  }) as string,

  fontSize: {
    h1: 36, // Larger for hero
    h2: 28, // Larger for section titles
    h3: 20,
    body: 16, // Slightly larger body
    bodySmall: 14,
    caption: 12,
    button: 16,
    buttonSmall: 14,
    label: 14,
    error: 12,
    tab: 12,
    badge: 10,
    sectionTitle: 24, // larger section titles
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeight: {
    h1: 44, // adjusted
    h2: 36, // adjusted
    h3: 28, // adjusted
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
    heading: -0.5, // Tighter for serifs like Leafora
  },
} as const;

export default typography;

