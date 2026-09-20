import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';

// Navigators
import DrawerNavigator from './DrawerNavigator';

// Screens
import EmployerRegistrationScreen from '../screens/EmployerRegistrationScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import EmployeeProfilesScreen from '../screens/EmployeeProfilesScreen';
import SuccessScreen from '../screens/SuccessScreen';
import ScanAndPayScreen from '../screens/ScanAndPayScreen';
import PaymentScreen from '../screens/PaymentScreen';

import HowItWorksScreen from '../screens/HowItWorksScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import PartnerUsScreen from '../screens/PartnerUsScreen';
import ReferAnEmployeeScreen from '../screens/ReferAnEmployeeScreen';
import ContactScreen from '../screens/ContactScreen';
import FAQScreen from '../screens/FAQScreen';
import ManagementTeamScreen from '../screens/ManagementTeamScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import RefundCancellationScreen from '../screens/RefundCancellationScreen';
import CareersScreen from '../screens/CareersScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id="root-stack" screenOptions={{ headerShown: false }}>
        {/* Main Entry is the Drawer Navigator */}
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />

        {/* Form & Modal stack screens accessible from anywhere */}
        <Stack.Screen
          name="EmployerRegistration"
          component={EmployerRegistrationScreen}
        />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="EmployeeProfiles" component={EmployeeProfilesScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />

        <Stack.Screen name="ScanAndPay" component={ScanAndPayScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen as any} />

        {/* Global auxiliary screens */}
        <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="PartnerUs" component={PartnerUsScreen} />
        <Stack.Screen name="ReferAnEmployee" component={ReferAnEmployeeScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="ManagementTeam" component={ManagementTeamScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        <Stack.Screen name="RefundCancellation" component={RefundCancellationScreen} />
        <Stack.Screen name="Careers" component={CareersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
