/**
 * Employer Registration API helper mapped to Firebase Firestore.
 */

import { ApiResponse } from './client';
import { ServiceKey } from '../constants/services';
import { submitEmployerRegistration as saveToFirebase } from '../services/firebase';

export interface EmployerRegistrationPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  hours: string;
}

export async function submitEmployerRegistration(
  serviceKey: ServiceKey,
  payload: EmployerRegistrationPayload,
): Promise<ApiResponse> {
  try {
    const result = await saveToFirebase({
      ...payload,
      serviceKey,
      serviceLabel: serviceKey,
    });

    if (result.success) {
      return {
        success: true,
        message: 'Registration submitted successfully!',
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
