import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { Alert, LogBox, View } from 'react-native';
import { registerPushToken } from './src/services/apiService';

// Ignore specific log warnings if needed in development
LogBox.ignoreLogs(['Must use physical device']);

// ── Hold the splash screen until we explicitly hide it ──────────────────────
// Must be called before any rendering occurs.
SplashScreen.preventAutoHideAsync().catch(() => {
  /* already hidden — safe to ignore */
});

// Minimum duration (ms) the splash stays visible — gives a polished feel
const SPLASH_MIN_DURATION_MS = 2000;

function App(): React.JSX.Element {
  const notificationListener = useRef<Notifications.Subscription | undefined>(undefined);
  const responseListener = useRef<Notifications.Subscription | undefined>(undefined);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let hideSplashTimeout: ReturnType<typeof setTimeout>;

    const prepareApp = async () => {
      const startTime = Date.now();

      try {
        // 1. Register for push notifications silently in background
        registerForPushNotificationsAsync().then(async (token) => {
          if (token) {
            console.log('Push token acquired on launch:', token);
            await registerPushToken(token);
          }
        });

        // 2. Listener for foreground notifications
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
          console.log('Foreground notification received:', notification);
          const title = notification.request.content.title;
          const body = notification.request.content.body;
          if (title || body) {
            Alert.alert(`🔔 ${title || 'Notification'}`, body || '');
          }
        });

        // 3. Listener for notification taps
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
          console.log('Notification response received:', response);
        });

      } catch (e) {
        console.warn('App preparation error:', e);
      } finally {
        // Ensure splash shows for at least SPLASH_MIN_DURATION_MS
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, SPLASH_MIN_DURATION_MS - elapsed);

        hideSplashTimeout = setTimeout(async () => {
          setAppReady(true);
          await SplashScreen.hideAsync();
        }, remaining);
      }
    };

    prepareApp();

    return () => {
      clearTimeout(hideSplashTimeout);
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // Don't render anything until we're ready — native splash is still showing
  if (!appReady) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
