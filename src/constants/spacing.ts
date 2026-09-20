const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  screenHorizontalPadding: 24, // increased for airiness
  screenVerticalPadding: 24, // increased

  cardPadding: 20, // increased
  cardMarginBottom: 20,
  cardBorderRadius: 24, // softer edges

  sectionGap: 32, // more breathing room
  sectionTitleMarginBottom: 16,

  formFieldGap: 24,
  inputHeight: 56, // taller for pill shape
  inputBorderRadius: 28, // pill shape
  inputPaddingHorizontal: 20,
  inputIconSize: 24,

  buttonHeight: 56, // taller
  buttonBorderRadius: 28, // pill shape
  buttonPaddingHorizontal: 32,

  tabBarHeight: 70, // taller tab bar
  tabIconSize: 24,

  headerHeight: 64,

  profileImageSize: 80,
  profileCardPadding: 20,

  serviceButtonSize: 80,
  serviceButtonGap: 16,
  serviceButtonBorderRadius: 24, // softer edges
  serviceEmojiSize: 32,

  accordionPadding: 20,
  accordionBorderRadius: 16,

  footerPaddingVertical: 32,
  footerPaddingHorizontal: 24,

  carouselHeight: 220, // slightly taller
  carouselBorderRadius: 24, // softer

  badgePaddingHorizontal: 12,
  badgePaddingVertical: 6,
  badgeBorderRadius: 12,

  minTouchTarget: 48,
} as const;

export default spacing;
