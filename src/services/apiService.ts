import { CONFIG } from '../config/env';
import { normalizePhone } from '../utils/validation';

// ─── Form 1: Employer Registration ────────────────────────────────────────────

export interface EmployerRegistrationPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  workingHours: string;
  serviceType: string;
  serviceLabel: string;
}

export const submitEmployerRegistration = async (
  data: EmployerRegistrationPayload,
): Promise<string> => {
  const response = await fetch(`${CONFIG.API_BASE_URL}/api/employer-registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:         data.name.trim(),
      phone:        normalizePhone(data.phone),
      email:        data.email.trim().toLowerCase(),
      city:         data.city,
      workingHours: data.workingHours,
      serviceType:  data.serviceType,
      serviceLabel: data.serviceLabel,
      platform:     'mobile',
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error || 'Failed to submit employer registration');
  }
  return resData.id;
};

// ─── Form 2: Partner Registration ─────────────────────────────────────────────

export interface PartnerRegistrationPayload {
  fullName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  message?: string;
}

export const submitPartnerRegistration = async (
  data: PartnerRegistrationPayload,
): Promise<string> => {
  const response = await fetch(`${CONFIG.API_BASE_URL}/api/partner-registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName:      data.fullName.trim(),
      contactPerson: data.contactPerson.trim(),
      phone:         normalizePhone(data.phone),
      email:         data.email.trim().toLowerCase(),
      city:          data.city.trim(),
      message:       data.message?.trim() ?? '',
      platform:      'mobile',
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error || 'Failed to submit partner registration');
  }
  return resData.id;
};

// ─── Form 3: Employee Referral ─────────────────────────────────────────────────

export interface EmployeeReferralPayload {
  jobCategory: string;
  employeeName: string;
  referrerPhone: string;
  location?: string;
  experience?: string;
  gender?: string;
}

export const submitEmployeeReferral = async (
  data: EmployeeReferralPayload,
): Promise<string> => {
  const response = await fetch(`${CONFIG.API_BASE_URL}/api/employee-referral`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jobCategory:   data.jobCategory,
      employeeName:  data.employeeName.trim(),
      referrerPhone: normalizePhone(data.referrerPhone),
      location:      data.location?.trim() ?? '',
      experience:    data.experience?.trim() ?? '',
      gender:        data.gender ?? '',
      platform:      'mobile',
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error || 'Failed to submit employee referral');
  }
  return resData.id;
};

// ─── Form 4: Feedback ─────────────────────────────────────────────────────────

export interface FeedbackPayload {
  name: string;
  phone?: string;
  email?: string;
  rating: number;
  ratingLabel: string;
  message: string;
}

export const submitFeedback = async (
  data: FeedbackPayload,
): Promise<string> => {
  const response = await fetch(`${CONFIG.API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:        data.name.trim(),
      phone:       data.phone ? normalizePhone(data.phone) : '',
      email:       data.email?.trim().toLowerCase() ?? '',
      rating:      data.rating,
      ratingLabel: data.ratingLabel,
      message:     data.message.trim(),
      platform:    'mobile',
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error || 'Failed to submit feedback');
  }
  return resData.id;
};
