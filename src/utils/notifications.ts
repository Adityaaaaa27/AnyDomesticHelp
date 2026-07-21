import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Request notification permissions and return the Expo Push Token.
 */
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;

  // 1. Android-specific channel configuration
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // 2. Push notifications only work on physical devices (not simulators)
  if (!Device.isDevice) {
    console.warn('Push notifications require a physical device. Simulator detected.');
    return undefined;
  }

  try {
    // 3. Check and request permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Failed to get push token: Notification permission not granted.');
      return undefined;
    }

    // 4. Retrieve EAS Project ID if configured
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    if (!projectId) {
      console.warn(
        'Warning: EAS projectId is not configured in app.json. ' +
        'Please run "npx eas project:init" to associate your app with an Expo project ID.'
      );
    }

    // 5. Get Expo Push Token
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log('Expo Push Token generated successfully:', token);
  } catch (error) {
    console.error('Error fetching Expo push token:', error);
  }

  return token;
}
