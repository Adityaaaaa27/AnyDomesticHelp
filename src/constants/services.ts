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
  { key: 'BabySitter',       label: 'Baby Sitter',      emoji: '👶', bgColor: '#FFF3E0' },
  { key: 'HouseMaid',        label: 'House Maid',       emoji: '🏠', bgColor: '#E8F5E9' },
  { key: 'Cook',             label: 'Cook',             emoji: '🍳', bgColor: '#FFF8E1' },
  { key: 'OfficeBoy',        label: 'Office Boy',       emoji: '📦', bgColor: '#FFF3E0' },
  { key: 'Helper',           label: 'Helper',           emoji: '🧰', bgColor: '#E8F5E9' },
  { key: 'Nanny',            label: 'Nanny',            emoji: '🤱', bgColor: '#F3E5F5' },
  { key: 'JapaMaid',         label: 'Japa Maid',        emoji: '🧽', bgColor: '#E8F5E9' },
  { key: 'Driver',           label: 'Driver',           emoji: '🚗', bgColor: '#FFF8E1' },
  { key: 'ElderlyCare',      label: 'Elderly Care',     emoji: '🧓', bgColor: '#E3F2FD' },
  { key: 'PatientCare',      label: 'Patient Care',     emoji: '🩺', bgColor: '#FCE4EC' },
  { key: 'CookHelper',       label: 'Cook / Helper',    emoji: '🍳', bgColor: '#E3F2FD' },
  { key: 'HomeTuition',      label: 'Home Tuition',     emoji: '📚', bgColor: '#F3E5F5' },
  { key: 'Staff_Restaurant', label: 'Restaurant Staff', emoji: '🍽️', bgColor: '#E8F5E9' },
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
