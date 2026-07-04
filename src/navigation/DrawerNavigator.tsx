import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from '../components/navigation/DrawerMenu';
import { DrawerParamList } from './types';

// Import Screens (we'll create them next)
import HomeScreen from '../screens/HomeScreen';
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

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      id="main-drawer"
      drawerContent={(props: any) => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={HomeScreen} />
      <Drawer.Screen name="HowItWorks" component={HowItWorksScreen} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
      <Drawer.Screen name="PartnerUs" component={PartnerUsScreen} />
      <Drawer.Screen name="ReferAnEmployee" component={ReferAnEmployeeScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="FAQ" component={FAQScreen} />
      <Drawer.Screen name="ManagementTeam" component={ManagementTeamScreen} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Drawer.Screen name="RefundCancellation" component={RefundCancellationScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
