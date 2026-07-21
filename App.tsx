import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';
import { Alert, LogBox } from 'react-native';
import { registerPushToken } from './src/services/apiService';

// Ignore specific log warnings if needed in development
LogBox.ignoreLogs(['Must use physical device']);

function App(): React.JSX.Element {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // 1. Register for push notifications and retrieve token
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        // Display token in an alert for easy testing on Expo Go
        Alert.alert(
          'Expo Push Token',
          token,
          [{ text: 'Copy Token / OK', onPress: () => console.log('Token Alert Dismissed') }]
        );

        // Send the token to our MongoDB backend
        try {
          await registerPushToken(token);
          console.log('Push token successfully registered with backend database.');
        } catch (error) {
          console.error('Failed to register push token with backend:', error);
        }
      }
    });

    // 2. Listener for foreground notifications
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Foreground notification received:', notification);
    });

    // 3. Listener for taps/interactions with notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
    });

    // Clean up subscriptions on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;

