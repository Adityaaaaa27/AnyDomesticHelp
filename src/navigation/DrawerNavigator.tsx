import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from '../components/navigation/DrawerMenu';
import { DrawerParamList } from './types';

// Import Screens
import HomeScreen from '../screens/HomeScreen';

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
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
