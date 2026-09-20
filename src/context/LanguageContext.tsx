import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  // Header
  appName: string;
  // Home Screen
  welcomeBack: string;
  heroTitle: string;
  heroSubtitle: string;
  ourServices: string;
  featuredProfiles: string;
  seeAll: string;
  // Drawer
  home: string;
  howItWorks: string;
  aboutUs: string;
  partnerUs: string;
  referEmployee: string;
  contactUs: string;
  faq: string;
  managementTeam: string;
  privacyPolicy: string;
  termsConditions: string;
  refundCancellation: string;
  // Profile card
  experience: string;
  // Language toggle
  langToggle: string;
  // Registration Form
  registrationTitle: string;
  serviceLabel: string;
  breadcrumbServices: string;
  breadcrumbRegistration: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  workingHoursLabel: string;
  workingHoursPlaceholder: string;
  registerBtn: string;
  registeringBtn: string;
  verifiedProf: string;
  support247: string;
  // Payment Screen
  paymentTitle: string;
  paymentComplete: string;
  registrationFee: string;
  paymentInstructions: string;
  paymentDoneBtn: string;
  upiLabel: string;
  paymentInfoText: string;
  paymentAlertTitle: string;
  paymentAlertMsg: string;
  paymentAlertOk: string;
  // Validation errors
  errNameRequired: string;
  errNameMin: string;
  errPhoneInvalid: string;
  errPhoneRequired: string;
  errEmailInvalid: string;
  errEmailRequired: string;
  errCityRequired: string;
  errWorkingHoursRequired: string;
  // Submit error
  submitFailed: string;
  submitFailedMsg: string;
}

const EN: Translations = {
  appName: 'Any Domestic Help',
  welcomeBack: 'Welcome back,',
  heroTitle: 'Find Trusted\nHome Helpers',
  heroSubtitle: 'Verified professionals for your peace of mind.',
  ourServices: 'Our Services',
  featuredProfiles: 'Featured Profiles',
  seeAll: 'See All',
  home: 'Home',
  howItWorks: 'How It Works',
  aboutUs: 'About Us',
  partnerUs: 'Partner Us',
  referEmployee: 'Refer an Employee',
  contactUs: 'Contact Us',
  faq: 'FAQ',
  managementTeam: 'Management Team',
  privacyPolicy: 'Privacy Policy',
  termsConditions: 'Terms & Conditions',
  refundCancellation: 'Refund and Cancellation',
  experience: 'Experience',
  langToggle: 'हिंदी',
  // Registration Form
  registrationTitle: 'Employer Registration',
  serviceLabel: 'Service',
  breadcrumbServices: 'Services › ',
  breadcrumbRegistration: 'Registration',
  nameLabel: 'Name of Employer',
  namePlaceholder: 'Your full name',
  phoneLabel: 'Phone Number',
  phonePlaceholder: '10-digit mobile number',
  emailLabel: 'E-Mail ID',
  emailPlaceholder: 'your@email.com',
  cityLabel: 'City',
  cityPlaceholder: 'Type or select your city',
  workingHoursLabel: 'Working Hours',
  workingHoursPlaceholder: 'Select working hours',
  registerBtn: 'Register',
  registeringBtn: 'Registering…',
  verifiedProf: 'Verified Professionals Only',
  support247: '24/7 Dedicated Support',
  // Payment
  paymentTitle: 'Payment',
  paymentComplete: 'Complete Your Request',
  registrationFee: 'Registration Fee',
  paymentInstructions: 'After scanning and completing payment, tap the button below. Our team will verify and call you shortly.',
  paymentDoneBtn: 'I Have Completed Payment',
  upiLabel: 'UPI ID:',
  paymentInfoText: 'Your registration is successful! Please complete the payment of ₹1,000 to confirm your request. Our team will contact you within 24 hours once payment is verified.',
  paymentAlertTitle: 'Payment Submitted',
  paymentAlertMsg: 'Thank you! We will verify your payment and get back to you shortly. You can also call or WhatsApp us on 7977409406.',
  paymentAlertOk: 'OK',
  // Validation
  errNameRequired: 'Name is required',
  errNameMin: 'Min 2 characters',
  errPhoneInvalid: 'Enter valid 10-digit mobile number',
  errPhoneRequired: 'Phone is required',
  errEmailInvalid: 'Enter valid email',
  errEmailRequired: 'Email is required',
  errCityRequired: 'Please select your city',
  errWorkingHoursRequired: 'Please select working hours',
  submitFailed: 'Submission Failed',
  submitFailedMsg: 'Please try again or call us on 7977409406.',
};

const HI: Translations = {
  appName: 'एनी डोमेस्टिक हेल्प',
  welcomeBack: 'वापस स्वागत है,',
  heroTitle: 'विश्वसनीय\nघरेलू सहायक खोजें',
  heroSubtitle: 'आपकी मन की शांति के लिए सत्यापित पेशेवर।',
  ourServices: 'हमारी सेवाएं',
  featuredProfiles: 'चुनिंदा प्रोफाइल',
  seeAll: 'सब देखें',
  home: 'होम',
  howItWorks: 'यह कैसे काम करता है',
  aboutUs: 'हमारे बारे में',
  partnerUs: 'हमसे जुड़ें',
  referEmployee: 'कर्मचारी रेफर करें',
  contactUs: 'संपर्क करें',
  faq: 'सामान्य प्रश्न',
  managementTeam: 'प्रबंधन टीम',
  privacyPolicy: 'गोपनीयता नीति',
  termsConditions: 'नियम और शर्तें',
  refundCancellation: 'वापसी और रद्दीकरण',
  experience: 'अनुभव',
  langToggle: 'English',
  // Registration Form
  registrationTitle: 'नियोक्ता पंजीकरण',
  serviceLabel: 'सेवा',
  breadcrumbServices: 'सेवाएं › ',
  breadcrumbRegistration: 'पंजीकरण',
  nameLabel: 'नियोक्ता का नाम',
  namePlaceholder: 'आपका पूरा नाम',
  phoneLabel: 'फोन नंबर',
  phonePlaceholder: '10 अंकों का मोबाइल नंबर',
  emailLabel: 'ई-मेल आईडी',
  emailPlaceholder: 'your@email.com',
  cityLabel: 'शहर',
  cityPlaceholder: 'अपना शहर चुनें या टाइप करें',
  workingHoursLabel: 'काम के घंटे',
  workingHoursPlaceholder: 'काम के घंटे चुनें',
  registerBtn: 'पंजीकरण करें',
  registeringBtn: 'पंजीकरण हो रहा है…',
  verifiedProf: 'केवल सत्यापित पेशेवर',
  support247: '24/7 समर्पित सहायता',
  // Payment
  paymentTitle: 'भुगतान',
  paymentComplete: 'अपना अनुरोध पूरा करें',
  registrationFee: 'पंजीकरण शुल्क',
  paymentInstructions: 'स्कैन करके भुगतान पूरा करने के बाद, नीचे बटन दबाएं। हमारी टीम जल्द ही सत्यापित करके आपसे संपर्क करेगी।',
  paymentDoneBtn: 'मैंने भुगतान पूरा कर लिया',
  upiLabel: 'UPI ID:',
  paymentInfoText: 'आपका पंजीकरण सफल हो गया! अपनी अनुरोध को पुष्ट करने के लिए कृपया ₹1,000 का भुगतान करें। भुगतान सत्यापित होने पर हमारी टीम 24 घंटे में संपर्क करेगी।',
  paymentAlertTitle: 'भुगतान जमा हो गया',
  paymentAlertMsg: 'धन्यवाद! हम आपके भुगतान को सत्यापित करेंगे और जल्द ही आपसे संपर्क करेंगे। आप हमें 7977409406 पर कॉल या WhatsApp भी कर सकते हैं।',
  paymentAlertOk: 'ठीक है',
  // Validation
  errNameRequired: 'नाम आवश्यक है',
  errNameMin: 'कम से कम 2 अक्षर',
  errPhoneInvalid: 'सही 10 अंकों का मोबाइल नंबर दर्ज करें',
  errPhoneRequired: 'फोन नंबर आवश्यक है',
  errEmailInvalid: 'सही ईमेल दर्ज करें',
  errEmailRequired: 'ईमेल आवश्यक है',
  errCityRequired: 'कृपया अपना शहर चुनें',
  errWorkingHoursRequired: 'कृपया काम के घंटे चुनें',
  submitFailed: 'सबमिशन विफल',
  submitFailedMsg: 'कृपया पुनः प्रयास करें या 7977409406 पर कॉल करें।',
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: EN,
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = language === 'en' ? EN : HI;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
