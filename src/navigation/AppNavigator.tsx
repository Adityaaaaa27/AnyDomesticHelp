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
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import CongratsPaymentScreen from '../screens/CongratsPaymentScreen';
import ScanAndPayScreen from '../screens/ScanAndPayScreen';

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
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="CongratsPayment" component={CongratsPaymentScreen} />
        <Stack.Screen name="ScanAndPay" component={ScanAndPayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
