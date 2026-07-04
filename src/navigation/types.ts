/**
 * Navigation route types for the entire app.
 */

import { ServiceKey } from '../constants/services';

export type RootStackParamList = {
  MainDrawer: undefined;
  Home: undefined;
  HowItWorks: undefined;
  AboutUs: undefined;
  PartnerUs: undefined;
  ReferAnEmployee: undefined;
  Contact: undefined;
  EmployerRegistration: { serviceKey: ServiceKey; serviceLabel: string };
  Feedback: undefined;
  EmployeeProfiles: { page?: number };
  PrivacyPolicy: undefined;
  TermsAndConditions: { defaultTab?: 'employee' | 'employer' };
  FAQ: undefined;
  ManagementTeam: undefined;
  RefundCancellation: undefined;
  Success: { message: string; returnTo: keyof RootStackParamList };
  OtpVerification: { employerName: string; employerPhone: string; expectedOtp: string };
  CongratsPayment: { employerName: string; employerPhone: string };
  ScanAndPay: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ServicesTab: undefined;
  ProfilesTab: undefined;
  ContactTab: undefined;
  MoreTab: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  HowItWorks: undefined;
  AboutUs: undefined;
  PartnerUs: undefined;
  ReferAnEmployee: undefined;
  Contact: undefined;
  FAQ: undefined;
  ManagementTeam: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  RefundCancellation: undefined;
};

// Screen route name constants for consistency
export const ROUTES = {
  HOME: 'Home' as const,
  HOW_IT_WORKS: 'HowItWorks' as const,
  ABOUT_US: 'AboutUs' as const,
  PARTNER_US: 'PartnerUs' as const,
  REFER_EMPLOYEE: 'ReferAnEmployee' as const,
  CONTACT: 'Contact' as const,
  EMPLOYER_REGISTRATION: 'EmployerRegistration' as const,
  FEEDBACK: 'Feedback' as const,
  EMPLOYEE_PROFILES: 'EmployeeProfiles' as const,
  PRIVACY_POLICY: 'PrivacyPolicy' as const,
  TERMS_CONDITIONS: 'TermsAndConditions' as const,
  FAQ: 'FAQ' as const,
  MANAGEMENT_TEAM: 'ManagementTeam' as const,
  REFUND_CANCELLATION: 'RefundCancellation' as const,
  SUCCESS: 'Success' as const,
};
