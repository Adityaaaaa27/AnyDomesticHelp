/**
 * Firebase Connectivity Test
 *
 * Call this once in App.tsx to verify Firestore is properly configured.
 *
 * Usage:
 *   import { testFirebase } from './src/utils/firebaseTest';
 *   testFirebase(); // Call once, check console logs
 */

import firestore from '@react-native-firebase/firestore';

export const testFirebase = async (): Promise<void> => {
  try {
    // Test: Firestore can write and delete
    const testDoc = await firestore().collection('_test').add({
      ok: true,
      timestamp: new Date().toISOString(),
    });
    console.log('✅ Firestore write OK:', testDoc.id);

    // Clean up test document
    await testDoc.delete();
    console.log('✅ Firestore delete OK');

    console.log('🎉 Firebase Firestore fully operational.');
  } catch (error: any) {
    console.error('❌ Firebase Firestore test failed:', error.message || error);
    console.error(
      'Make sure google-services.json (Android) and GoogleService-Info.plist (iOS) are in place.',
    );
  }
};
