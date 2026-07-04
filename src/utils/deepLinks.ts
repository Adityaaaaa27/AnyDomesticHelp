/**
 * Deep linking utilities for phone calls, WhatsApp, email, and maps.
 * Uses React Native's built-in Linking API.
 */

import { Linking, Alert, Platform } from 'react-native';

/**
 * Open the phone dialer with the given number.
 */
export const callPhone = async (number: string): Promise<void> => {
  const cleanNumber = number.replace(/[^0-9+]/g, '');
  const url = `tel:${cleanNumber}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Phone calls are not supported on this device.');
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to open phone dialer.');
  }
};

/**
 * Open WhatsApp with the given phone number.
 * Falls back to App Store / Play Store if WhatsApp is not installed.
 */
export const openWhatsApp = async (number: string): Promise<void> => {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  // Add country code if not present
  const fullNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
  const whatsappUrl = `whatsapp://send?phone=${fullNumber}`;

  try {
    const supported = await Linking.canOpenURL(whatsappUrl);
    if (supported) {
      await Linking.openURL(whatsappUrl);
    } else {
      // WhatsApp not installed — redirect to store
      const storeUrl = Platform.select({
        ios: 'https://apps.apple.com/app/whatsapp-messenger/id310633997',
        android: 'https://play.google.com/store/apps/details?id=com.whatsapp',
      });
      if (storeUrl) {
        await Linking.openURL(storeUrl);
      } else {
        Alert.alert(
          'WhatsApp Not Installed',
          'Please install WhatsApp to send a message.',
        );
      }
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to open WhatsApp.');
  }
};

/**
 * Open the email client with the given address pre-filled.
 */
export const sendEmail = async (address: string): Promise<void> => {
  const url = `mailto:${address}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Email is not supported on this device.');
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to open email client.');
  }
};

/**
 * Open maps app with the given address for navigation.
 */
export const openMaps = async (address: string): Promise<void> => {
  const encodedAddress = encodeURIComponent(address);
  const url = Platform.select({
    ios: `maps:0,0?q=${encodedAddress}`,
    android: `geo:0,0?q=${encodedAddress}`,
  });

  try {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback to Google Maps web
        await Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        );
      }
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to open maps.');
  }
};
