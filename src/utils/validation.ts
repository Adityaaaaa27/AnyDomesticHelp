/**
 * Yup validation schemas and error messages for all forms.
 *
 * Updated for Firebase integration:
 * - Phone regex validates Indian mobile (starts with 6-9, 10 digits)
 * - Feedback: phone and email are optional
 * - Refer Employee: added gender field
 */

import * as yup from 'yup';

// Standard error messages
export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_MIN: 'Name must be at least 2 characters',
  NAME_ALPHA: 'Name must contain only letters and spaces',
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_INVALID: 'Enter a valid 10-digit mobile number',
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  CITY_REQUIRED: 'Please select your city',
  HOURS_REQUIRED: 'Please select working hours',
  JOB_REQUIRED: 'Please select job category',
  MESSAGE_REQUIRED: 'Message is required',
  MESSAGE_MIN: 'Message must be at least 10 characters',
  EMPLOYEE_NAME_REQUIRED: 'Employee name is required',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again.',
} as const;

/**
 * Employer Registration Form Schema
 * Fields: name, phone, email, city, hours
 * OTP: NO
 */
export const employerRegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN)
    .matches(/^[A-Za-z\s]+$/, ERROR_MESSAGES.NAME_ALPHA),
  phone: yup
    .string()
    .required(ERROR_MESSAGES.PHONE_REQUIRED)
    .matches(/^[6-9]\d{9}$/, ERROR_MESSAGES.PHONE_INVALID),
  email: yup
    .string()
    .required(ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  city: yup
    .string()
    .required(ERROR_MESSAGES.CITY_REQUIRED)
    .min(1, ERROR_MESSAGES.CITY_REQUIRED),
  hours: yup
    .string()
    .required(ERROR_MESSAGES.HOURS_REQUIRED)
    .min(1, ERROR_MESSAGES.HOURS_REQUIRED),
});

/**
 * Partner Registration Form Schema
 * Fields: name, phone, email, city, message
 * OTP: NO
 */
export const partnerRegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN),
  phone: yup
    .string()
    .required(ERROR_MESSAGES.PHONE_REQUIRED)
    .matches(/^[6-9]\d{9}$/, ERROR_MESSAGES.PHONE_INVALID),
  email: yup
    .string()
    .required(ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  city: yup
    .string()
    .required(ERROR_MESSAGES.CITY_REQUIRED),
  message: yup.string().optional(),
});

/**
 * Refer an Employee Form Schema
 * Fields: jobCategory, employeeName, phone, location, experience, gender
 * OTP: NO
 */
export const referEmployeeSchema = yup.object().shape({
  jobCategory: yup
    .string()
    .required(ERROR_MESSAGES.JOB_REQUIRED)
    .min(1, ERROR_MESSAGES.JOB_REQUIRED),
  employeeName: yup
    .string()
    .required(ERROR_MESSAGES.EMPLOYEE_NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN),
  phone: yup
    .string()
    .required(ERROR_MESSAGES.PHONE_REQUIRED)
    .matches(/^[6-9]\d{9}$/, ERROR_MESSAGES.PHONE_INVALID),
  location: yup.string().optional(),
  experience: yup.string().optional(),
  gender: yup.string().optional(),
});

/**
 * Feedback Form Schema
 * Fields: name, phone (optional), email (optional), rating, message
 * OTP: NO
 */
export const feedbackSchema = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN),
  phone: yup
    .string()
    .optional()
    .test('phone-valid', ERROR_MESSAGES.PHONE_INVALID, (value) => {
      if (!value || value.length === 0) return true;
      return /^[6-9]\d{9}$/.test(value);
    }),
  email: yup
    .string()
    .optional()
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  rating: yup.string().optional(),
  message: yup
    .string()
    .required(ERROR_MESSAGES.MESSAGE_REQUIRED)
    .min(10, ERROR_MESSAGES.MESSAGE_MIN)
    .max(500, 'Message cannot exceed 500 characters'),
});

export type EmployerRegistrationFormData = yup.InferType<typeof employerRegistrationSchema>;
export type PartnerRegistrationFormData = yup.InferType<typeof partnerRegistrationSchema>;
export type ReferEmployeeFormData = yup.InferType<typeof referEmployeeSchema>;
export type FeedbackFormData = yup.InferType<typeof feedbackSchema>;

// Normalize phone to plain 10 digits
export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return digits.slice(2);
  if (digits.length === 10) return digits;
  throw new Error('Please enter a valid 10-digit Indian mobile number');
};

