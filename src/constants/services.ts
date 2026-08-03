import colors from './colors';

export type ServiceKey =
  | 'BabySitter'
  | 'HouseMaid'
  | 'Cook'
  | 'OfficeBoy'
  | 'Helper'
  | 'Nanny'
  | 'JapaMaid'
  | 'Driver'
  | 'ElderlyCare'
  | 'PatientCare'
  | 'CookHelper'
  | 'HomeTuition'
  | 'Staff_Restaurant';

export interface Service {
  key: ServiceKey;
  label: string;
  emoji: string;
  bgColor: string;
}

export const SERVICES: Service[] = [
  { key: 'BabySitter',       label: 'Baby Sitter',      emoji: '👶', bgColor: colors.serviceBg1 },
  { key: 'HouseMaid',        label: 'House Maid',       emoji: '🏠', bgColor: colors.serviceBg2 },
  { key: 'Cook',             label: 'Cook',             emoji: '🍳', bgColor: colors.serviceBg3 },
  { key: 'OfficeBoy',        label: 'Office Boy',       emoji: '📦', bgColor: colors.serviceBg4 },
  { key: 'Helper',           label: 'Helper',           emoji: '🧰', bgColor: colors.serviceBg5 },
  { key: 'Nanny',            label: 'Nanny',            emoji: '🤱', bgColor: colors.serviceBg1 },
  { key: 'JapaMaid',         label: 'Japa Maid',        emoji: '🧽', bgColor: colors.serviceBg2 },
  { key: 'Driver',           label: 'Driver',           emoji: '🚗', bgColor: colors.serviceBg3 },
  { key: 'ElderlyCare',      label: 'Elderly Care',     emoji: '🧓', bgColor: colors.serviceBg4 },
  { key: 'PatientCare',      label: 'Patient Care',     emoji: '🩺', bgColor: colors.serviceBg5 },
  { key: 'CookHelper',       label: 'Cook / Helper',    emoji: '🍳', bgColor: colors.serviceBg1 },
  { key: 'HomeTuition',      label: 'Home Tuition',     emoji: '📚', bgColor: colors.serviceBg2 },
  { key: 'Staff_Restaurant', label: 'Restaurant Staff', emoji: '🍽️', bgColor: colors.serviceBg3 },
];

export const CAROUSEL_SERVICES: ServiceKey[] = [
  'BabySitter',
  'Cook',
  'HouseMaid',
];

export const CAROUSEL_IMAGES: Record<string, { label: string; image: string }> = {
  BabySitter: { label: 'BABYSITTER', image: 'https://www.anydomestichelp.com/images/3.jpeg' },
  Cook:       { label: 'COOK',       image: 'https://www.anydomestichelp.com/images/1.jpeg' },
  HouseMaid:  { label: 'HOUSEMAID',  image: 'https://www.anydomestichelp.com/images/2.jpeg' },
};

export const WORKING_HOURS = [
  { label: 'Part Time 4 Hrs',           value: 'Part Time 4 Hrs' },
  { label: 'Part Time 8 Hrs',           value: 'Full Time 8 Hrs' },
  { label: 'Part Time 10 Hrs',          value: 'Full Time 10 Hrs' },
  { label: 'Full Time 24 Hrs (Live In)', value: '24 Hrs Live In' },
];
