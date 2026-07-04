import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Standard demo Firebase configuration.
// Replace these with your real Firebase Project configurations from the Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyAs-demo-key-for-any-domestic-help",
  authDomain: "anydomestichelp-demo.firebaseapp.com",
  projectId: "anydomestichelp-demo",
  storageBucket: "anydomestichelp-demo.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:demoapp"
};

let db: any = null;
let isFirebaseInitialized = false;

try {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  isFirebaseInitialized = true;
  console.log('Firebase successfully initialized!');
} catch (error) {
  console.warn('Firebase initialization failed, falling back to local storage:', error);
}

/**
 * Saves a document to a Firestore collection with local storage fallback.
 */
async function saveDocument(collectionName: string, data: any): Promise<{ success: boolean; id?: string; error?: any }> {
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  // 1. Try saving to Cloud Firestore (only if not using the default placeholder api key)
  const isDemoConfig = firebaseConfig.apiKey.includes('demo-key');
  if (isFirebaseInitialized && db && !isDemoConfig) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firebase timeout')), 3000)
      );
      const savePromise = addDoc(collection(db, collectionName), {
        ...payload,
        serverTime: serverTimestamp(),
      });
      const docRef = (await Promise.race([savePromise, timeoutPromise])) as any;
      console.log(`Document saved to Firestore [${collectionName}]:`, docRef.id);
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.warn(`Firestore save failed for ${collectionName}, falling back to local:`, error);
    }
  }

  // 2. Fallback: Save to Local AsyncStorage
  try {
    const key = `@adh:${collectionName}`;
    const existing = await AsyncStorage.getItem(key);
    const list = existing ? JSON.parse(existing) : [];
    const localId = `local-${Date.now()}`;
    list.push({ id: localId, ...payload });
    await AsyncStorage.setItem(key, JSON.stringify(list));
    console.log(`Document saved locally in AsyncStorage [${collectionName}]:`, localId);
    return { success: true, id: localId };
  } catch (error: any) {
    console.error('AsyncStorage fallback save failed:', error);
    return { success: false, error };
  }
}

// -------------------------------------------------------------
// Database API methods matching our forms
// -------------------------------------------------------------

export interface EmployerRegistrationPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  hours: string;
  serviceKey: string;
  serviceLabel: string;
}

export interface PartnerRegistrationPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  company: string;
  message: string;
}

export interface ReferEmployeePayload {
  name: string;
  phone: string;
  jobCategory: string;
  experience: string;
  city: string;
  message: string;
}

export interface FeedbackPayload {
  name: string;
  phone: string;
  email: string;
  rating: string;
  message: string;
}

export const submitEmployerRegistration = async (payload: EmployerRegistrationPayload) => {
  return await saveDocument('employer_registrations', payload);
};

export const submitPartnerRegistration = async (payload: PartnerRegistrationPayload) => {
  return await saveDocument('partner_registrations', payload);
};

export const submitReferEmployee = async (payload: ReferEmployeePayload) => {
  return await saveDocument('employee_referrals', payload);
};

export const submitFeedback = async (payload: FeedbackPayload) => {
  return await saveDocument('feedback', payload);
};
