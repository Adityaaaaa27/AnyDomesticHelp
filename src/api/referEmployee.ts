/**
 * Refer Employee API helper mapped to Firebase Firestore.
 */

import { ApiResponse } from './client';
import { submitReferEmployee as saveToFirebase } from '../services/firebase';

export interface ReferEmployeePayload {
  jobCategory: string;
  name: string;
  phone: string;
  experience?: string;
  city?: string;
  message?: string;
}

export async function submitReferEmployee(
  payload: ReferEmployeePayload,
): Promise<ApiResponse> {
  try {
    const result = await saveToFirebase({
      jobCategory: payload.jobCategory,
      name: payload.name,
      phone: payload.phone,
      experience: payload.experience || '',
      city: payload.city || '',
      message: payload.message || '',
    });

    if (result.success) {
      return {
        success: true,
        message: 'Employee referral submitted successfully!',
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
