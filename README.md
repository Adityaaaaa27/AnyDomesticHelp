# Any Domestic Help Mobile App

A complete, production-ready React Native (bare workflow) mobile application for **Any Domestic Help** (anydomestichelp.com) — a domestic manpower placement service based in Mumbai.

## Features

- **15 Production-Ready Screens**: Replicating every web/mobile page in full legal detail.
- **Custom Navigation Structure**: Integrated Drawer Navigation (side menu) + Root Stacks for forms and success routes.
- **4 Forms with Validation**: Employer Registration, Partner Us, Refer an Employee, and Feedback Forms fully validated using `react-hook-form` and `yup`.
- **40+ Premium Components**: Reusable cards, custom searchable modals for dropdowns, form inputs, loading overlays, animators, and footers.
- **Deep Linking**: Integrated phone dialer, native email client, WhatsApp, and Google Maps linking.
- **Offline Mode & Error Handling**: Persistent network checking, offline warning banners, form submission disabling when offline, and broken link handling.

## Directory Structure

```
src/
├── screens/                  # 15 Complete Screens
│   ├── HomeScreen.tsx
│   ├── HowItWorksScreen.tsx
│   ├── AboutUsScreen.tsx
│   ├── PartnerUsScreen.tsx
│   ├── ReferAnEmployeeScreen.tsx
│   ├── ContactScreen.tsx
│   ├── EmployerRegistrationScreen.tsx
│   ├── FeedbackScreen.tsx
│   ├── EmployeeProfilesScreen.tsx
│   ├── PrivacyPolicyScreen.tsx
│   ├── TermsAndConditionsScreen.tsx
│   ├── FAQScreen.tsx
│   ├── ManagementTeamScreen.tsx
│   ├── RefundCancellationScreen.tsx
│   └── SuccessScreen.tsx
│
├── components/               # 40+ Reusable Components
│   ├── navigation/           # Custom header, custom bottom tabs, custom side drawer
│   ├── buttons/              # Primary brand CTA, emoji service selectors, pagination, tab buttons
│   ├── cards/                # Caregiver details card, preview cards
│   ├── forms/                # Form fields, phone inputs, email inputs, searchable dropdown modal
│   ├── media/                # Aspect-ratio banners, image carousels, thumbnails
│   └── layout/               # Accordion FAQ, contact info rows, loading spinner, containers
│
├── navigation/
│   ├── AppNavigator.tsx      # Main Root Stack Navigation
│   ├── DrawerNavigator.tsx   # Side Drawer Navigation
│   └── types.ts              # Full TypeScript screen route declarations
│
├── constants/
│   ├── colors.ts             # Harmonious UI colors matching screenshot exports
│   ├── typography.ts         # Typography size, height, and weight rules
│   ├── spacing.ts            # Layout paddings and sizes
│   ├── services.ts           # 13 service definitions
│   ├── cities.ts             # 97 cities from registration dropdown
│   ├── faqData.ts            # 11 FAQ questions and answers
│   └── employeeProfiles.ts   # 33 caregiver profile records
│
├── api/
│   ├── client.ts             # Base Axios instance Configuration
│   ├── employerRegistration.ts
│   ├── partnerRegistration.ts
│   ├── referEmployee.ts
│   └── feedback.ts
│
└── utils/
    ├── validation.ts         # Form schema validation utilities
    ├── deepLinks.ts          # External app linking handlers
    └── formatters.ts         # Utility string formatters
```

## Running the Application

### 1. Set Up Environment
Make sure Node.js (v18+), JDK 17, and Android Studio with SDK are properly installed.

### 2. Install Dependencies
Navigate to the project root and run:
```bash
npm install --legacy-peer-deps
```

### 3. Start Metro Bundler
```bash
npm start
```

### 4. Build and Run on Android Emulator/Device
In a separate terminal, run:
```bash
npx react-native run-android
```

## API TODOs for Backend Owner

Each API file inside `src/api/` contains form data configurations. Until the server-side field names are confirmed by the website owner, please verify the following:

1. **`employerRegistration.ts`**: Confirm if PHP `$_POST` fields match: `name`, `phone`, `email`, `city`, `hours`, and parameter `a`.
2. **`partnerRegistration.ts`**: Confirm fields for `name`, `phone`, `email`, `city`, `company`, `message`.
3. **`referEmployee.ts`**: Confirm fields for `jobcategory`, `name`, `phone`, `experience`, `city`, `message`.
4. **`feedback.ts`**: Confirm fields for `name`, `phone`, `email`, `rating`, `message`.
