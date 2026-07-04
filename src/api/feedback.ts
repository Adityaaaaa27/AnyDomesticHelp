/**
 * Feedback API helper mapped to Firebase Firestore.
 */

import { ApiResponse } from './client';
import { submitFeedback as saveToFirebase } from '../services/firebase';

export interface FeedbackPayload {
  name: string;
  phone: string;
  email: string;
  rating?: string;
  message: string;
}

export async function submitFeedback(
  payload: FeedbackPayload,
): Promise<ApiResponse> {
  try {
    const result = await saveToFirebase({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      rating: payload.rating || '5',
      message: payload.message,
    });

    if (result.success) {
      return {
        success: true,
        message: 'Thank you for your feedback!',
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
