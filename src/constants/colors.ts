const colors = {
  // Primary / Botanical Green Palette
  primary: '#334A36',       // Main Dark Olive Green
  primaryDark: '#233825',
  primaryDeep: '#1A281B',
  primaryLight: '#E8EFE9',  // Very soft green for backgrounds
  primaryBorder: '#D1DFD3',
  primaryMuted: '#839C86',
  primaryDarkest: '#111B12',

  // Accent Colors
  accent: '#799E75',        // Lighter soft leafy green
  accentDark: '#5E7D5A',
  accentLight: '#E2EBE1',

  // Background / Paper Colors
  background: '#F6F4EE',        // Cream / Off-white background (like screenshot)
  backgroundGrey: '#EAE6DB',    // Slightly darker cream
  backgroundDark: '#334A36',
  backgroundCard: '#FFFFFF',    // White for elevated cards

  // Text & Ink Colors
  textPrimary: '#1E231F',   // Almost black, slight green tint
  textSecondary: '#5A665D', // Muted dark green/gray
  textTertiary: '#8D9990',
  textWhite: '#FFFFFF',
  textLink: '#334A36',
  textGold: '#C49749',

  // Status & Alert Colors
  error: '#BA5B4E',
  success: '#5B8C5A',
  warning: '#C49749',
  info: '#334A36',

  // UI Borders, Lines & Shadows
  border: '#E8E4D9',
  borderFocused: '#334A36',
  divider: '#E8E4D9',
  shadow: 'rgba(51, 74, 54, 0.05)',
  overlay: 'rgba(30, 35, 31, 0.4)',
  placeholder: '#8D9990',
  disabled: '#B3BCB5',
  disabledBg: '#EAE6DB',

  // Cards & Inputs
  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(0, 0, 0, 0.04)',
  inputBackground: '#FFFFFF',

  // Category & Service Card Colors
  serviceBg1: '#E8EFE9',
  serviceBg2: '#F3E8E3',
  serviceBg3: '#F4F0DE',
  serviceBg4: '#EAE6DB',
  serviceBg5: '#E1EBE2',
  serviceBg6: '#F0E6D2',

  // Navigation & Tabs
  tabActive: '#334A36',
  tabInactive: '#A2AD9A',
  tabBackground: '#F6F4EE',

  // Drawer & Footer
  footerBackground: '#334A36',
  footerText: '#F6F4EE',
  footerLink: '#E2EBE1',

  // Badges & Ratings
  badgeBlue: '#334A36',
  badgeGreen: '#799E75',
  badgeText: '#FFFFFF',

  feedbackBg: '#334A36',
  feedbackText: '#FFFFFF',

  requiredStar: '#BA5B4E',
  ratingGold: '#C49749',

  // Full Color Palette Tokens
  verified: {
    50: '#E8EFE9',
    100: '#D1DFD3',
    300: '#839C86',
    500: '#334A36',
    600: '#233825',
    700: '#1A281B',
    900: '#111B12',
  },
  coral: {
    100: '#F5E6E3',
    500: '#BA5B4E',
    600: '#9C4C41',
  },
  amber: {
    50: '#F9F5EA',
    100: '#F0E6D2',
    200: '#E6D3B1',
    300: '#CDB17D',
    500: '#C49749',
    600: '#A37D3D',
  },
  emerald: {
    300: '#8DBD8C',
    500: '#5B8C5A',
    600: '#4A7349',
    700: '#385737',
  },
  paper: {
    default: '#F6F4EE',
    raised: '#FFFFFF',
    sunken: '#EAE6DB',
  },
  ink: {
    default: '#1E231F',
    soft: '#5A665D',
    slate: '#8D9990',
  },
} as const;

export type ColorKey = keyof typeof colors;
export default colors;

