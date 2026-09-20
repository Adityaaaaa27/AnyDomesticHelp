import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';
import { Alert, LogBox } from 'react-native';
import { registerPushToken } from './src/services/apiService';

// Ignore specific log warnings if needed in development
LogBox.ignoreLogs(['Must use physical device']);

function App(): React.JSX.Element {
  const notificationListener = useRef<Notifications.Subscription | undefined>(undefined);
  const responseListener = useRef<Notifications.Subscription | undefined>(undefined);

  useEffect(() => {
    // 1. Register for push notifications silently in background
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        console.log('Push token acquired on launch:', token);
        await registerPushToken(token);
      }
    });

    // 2. Listener for foreground notifications (shows Alert popup inside app)
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Foreground notification received:', notification);
      const title = notification.request.content.title;
      const body = notification.request.content.body;
      if (title || body) {
        Alert.alert(`🔔 ${title || 'Notification'}`, body || '');
      }
    });

    // 3. Listener for taps/interactions with notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
    });

    // Clean up subscriptions on unmount
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;

