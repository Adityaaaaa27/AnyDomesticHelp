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
 * Open WhatsApp chat directly with the given phone number.
 * Uses the universal https://wa.me/ link — opens in WhatsApp app if installed,
 * or WhatsApp Web in browser otherwise. Never redirects to the app store.
 */
export const openWhatsApp = async (number: string, text?: string): Promise<void> => {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  // Add India country code if not already present
  const fullNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  // wa.me universal link — works on all platforms, opens chat directly
  const waUrl = `https://wa.me/${fullNumber}${encodedText}`;

  try {
    await Linking.openURL(waUrl);
  } catch (error) {
    Alert.alert('Error', 'Unable to open WhatsApp. Please try again.');
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
