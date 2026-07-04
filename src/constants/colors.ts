const colors = {
  primary: '#3F51B5',
  primaryDark: '#303F9F',
  primaryLight: '#E8EAF6',
  accent: '#3F51B5',

  background: '#FFFFFF',
  backgroundGrey: '#F5F7FA',
  backgroundDark: '#1C1C1E',

  textPrimary: '#1A1A2E',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textWhite: '#FFFFFF',
  textLink: '#3F51B5',
  textGold: '#D4AF37',

  error: '#E53935',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',

  border: '#E0E0E0',
  borderFocused: '#3F51B5',
  divider: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  placeholder: '#C0C0C0',
  disabled: '#BDBDBD',
  disabledBg: '#F0F0F0',

  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(0, 0, 0, 0.06)',
  inputBackground: '#FFFFFF',

  serviceBg1: '#FFF3E0',
  serviceBg2: '#E8F5E9',
  serviceBg3: '#E3F2FD',
  serviceBg4: '#F3E5F5',
  serviceBg5: '#FCE4EC',
  serviceBg6: '#FFF8E1',

  tabActive: '#3F51B5',
  tabInactive: '#999999',
  tabBackground: '#FFFFFF',

  footerBackground: '#1C1C1E',
  footerText: '#F5F5F7',
  footerLink: '#D4AF37',

  badgeBlue: '#3F51B5',
  badgeGreen: '#4CAF50',
  badgeText: '#FFFFFF',

  feedbackBg: '#3F51B5',
  feedbackText: '#FFFFFF',

  requiredStar: '#E53935',
  ratingGold: '#FFB300',
} as const;

export type ColorKey = keyof typeof colors;
export default colors;
