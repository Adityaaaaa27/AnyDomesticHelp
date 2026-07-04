/**
 * Privacy Policy content structured for rendering.
 * Extracted from the live website (privacy.php).
 */

export interface PrivacySection {
  title: string;
  paragraphs: string[];
}

export const PRIVACY_POLICY_SECTIONS: PrivacySection[] = [
  {
    title: 'Introduction',
    paragraphs: [
      'Any Domestic Help ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website anydomestichelp.com or use our services.',
      'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: [
      'We may collect information about you in a variety of ways. The information we may collect includes:',
      'Personal Data: Name, email address, phone number, city, and other contact details that you voluntarily provide when registering on the site or filling out forms.',
      'Employment Data: Job category preferences, working hours, experience details, and other employment-related information.',
      'Device Data: Information about your mobile device or computer, including IP address, browser type, operating system, and access times.',
    ],
  },
  {
    title: 'Use of Your Information',
    paragraphs: [
      'We may use information collected about you to:',
      '• Process your employer registration and connect you with suitable domestic help candidates.',
      '• Send you information about our services, updates, and promotional materials.',
      '• Respond to your inquiries and provide customer support.',
      '• Improve our website and services based on user feedback.',
      '• Monitor and analyze usage and trends to improve user experience.',
      '• Prevent fraudulent transactions and monitor against theft.',
    ],
  },
  {
    title: 'Disclosure of Your Information',
    paragraphs: [
      'We may share information we have collected about you in certain situations:',
      'By Law or to Protect Rights: If we believe the release of information is needed to comply with the law, enforce our policies, or protect our or others\' rights, property, or safety.',
      'Business Partners: We may share your information with our business partners to offer you certain services or promotions.',
      'With Your Consent: We may disclose your personal information for any other purpose with your consent.',
    ],
  },
  {
    title: 'Security of Your Information',
    paragraphs: [
      'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.',
    ],
  },
  {
    title: 'Third-Party Websites',
    paragraphs: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of third-party sites. We encourage you to read the privacy policies of any linked sites.',
    ],
  },
  {
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.',
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: [
      'If you have questions or comments about this Privacy Policy, please contact us at:',
      'Any Domestic Help\n54, Mamta \'A\' wing, A.M. Marg, Prabhadevi, Mumbai - 400 025\nPhone: 022-66661314 / 9820108341\nEmail: info@anydomestichelp.com',
    ],
  },
];
