const colors = {
  // Primary / Verified Brand Teal Palette
  primary: '#0E6F5C',       // --color-verified-500 (Primary Theme Color)
  primaryDark: '#0B5C4C',   // --color-verified-600
  primaryDeep: '#094A3D',   // --color-verified-700
  primaryLight: '#E9F4F1',  // --color-verified-50
  primaryBorder: '#CBE6DE', // --color-verified-100
  primaryMuted: '#6FADA0',  // --color-verified-300
  primaryDarkest: '#06322A',// --color-verified-900

  // Accent / Coral Colors (Buttons, CTA, Alerts)
  accent: '#C1533A',        // --color-coral-500
  accentDark: '#A4432C',    // --color-coral-600
  accentLight: '#F3DDD6',   // --color-coral-100

  // Background / Paper Colors
  background: '#FBF8F4',        // --color-paper (Main App Body)
  backgroundGrey: '#F2EDE4',    // --color-paper-sunken (Section BG)
  backgroundDark: '#06322A',    // --color-verified-900 (Dark Drawer/Footer)
  backgroundCard: '#FFFFFF',    // --color-paper-raised (Card BG)

  // Text & Ink Colors
  textPrimary: '#14231F',   // --color-ink (Primary dark text)
  textSecondary: '#3D4A45', // --color-ink-soft
  textTertiary: '#5B6764',  // --color-slate (Muted text)
  textWhite: '#FFFFFF',
  textLink: '#0E6F5C',
  textGold: '#D98E2B',      // --color-amber-500

  // Status & Alert Colors
  error: '#C1533A',         // Warm Coral error/warning
  success: '#00BC7D',       // --color-emerald-500
  warning: '#D98E2B',       // --color-amber-500
  info: '#0E6F5C',

  // UI Borders, Lines & Shadows
  border: '#E4DFD6',        // --color-line
  borderFocused: '#0E6F5C',
  divider: '#E4DFD6',
  shadow: 'rgba(20, 35, 31, 0.08)',
  overlay: 'rgba(20, 35, 31, 0.5)',
  placeholder: '#5B6764',
  disabled: '#A0AAB0',
  disabledBg: '#F2EDE4',

  // Cards & Inputs
  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(20, 35, 31, 0.06)',
  inputBackground: '#FFFFFF',

  // Category & Service Card Colors
  serviceBg1: '#E9F4F1',
  serviceBg2: '#F3DDD6',
  serviceBg3: '#FFFBEB',
  serviceBg4: '#F2EDE4',
  serviceBg5: '#CBE6DE',
  serviceBg6: '#F7E6C4',

  // Navigation & Tabs
  tabActive: '#0E6F5C',
  tabInactive: '#5B6764',
  tabBackground: '#FFFFFF',

  // Drawer & Footer
  footerBackground: '#06322A', // --color-verified-900
  footerText: '#E9F4F1',       // --color-verified-50
  footerLink: '#EABF72',       // --color-amber-300

  // Badges & Ratings
  badgeBlue: '#0E6F5C',
  badgeGreen: '#00BC7D',
  badgeText: '#FFFFFF',

  feedbackBg: '#0E6F5C',
  feedbackText: '#FFFFFF',

  requiredStar: '#C1533A',
  ratingGold: '#D98E2B',

  // Full Color Palette Tokens
  verified: {
    50: '#E9F4F1',
    100: '#CBE6DE',
    300: '#6FADA0',
    500: '#0E6F5C',
    600: '#0B5C4C',
    700: '#094A3D',
    900: '#06322A',
  },
  coral: {
    100: '#F3DDD6',
    500: '#C1533A',
    600: '#A4432C',
  },
  amber: {
    50: '#FFFBEB',
    100: '#F7E6C4',
    200: '#FEE685',
    300: '#EABF72',
    500: '#D98E2B',
    600: '#B8741D',
  },
  emerald: {
    300: '#5EE9B5',
    500: '#00BC7D',
    600: '#009966',
    700: '#007A55',
  },
  paper: {
    default: '#FBF8F4',
    raised: '#FFFFFF',
    sunken: '#F2EDE4',
  },
  ink: {
    default: '#14231F',
    soft: '#3D4A45',
    slate: '#5B6764',
  },
} as const;

export type ColorKey = keyof typeof colors;
export default colors;

