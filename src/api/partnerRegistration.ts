/**
 * Partner Registration API helper mapped to Firebase Firestore.
 */

import { ApiResponse } from './client';
import { submitPartnerRegistration as saveToFirebase } from '../services/firebase';

export interface PartnerRegistrationPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  company?: string;
  message?: string;
}

export async function submitPartnerRegistration(
  payload: PartnerRegistrationPayload,
): Promise<ApiResponse> {
  try {
    const result = await saveToFirebase({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      city: payload.city,
      company: payload.company || '',
      message: payload.message || '',
    });

    if (result.success) {
      return {
        success: true,
        message: 'Partner registration submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        message: 'Database save failed. Please check your network connection.',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Submission failed',
    };
  }
}
