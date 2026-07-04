/**
 * Yup validation schemas and error messages for all forms.
 */

import * as yup from 'yup';

// Standard error messages
export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_MIN: 'Name must be at least 2 characters',
  NAME_ALPHA: 'Name must contain only letters and spaces',
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_INVALID: 'Please enter a valid 10-digit phone number',
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  CITY_REQUIRED: 'Please select your city',
  HOURS_REQUIRED: 'Please select working hours',
  JOB_REQUIRED: 'Please select job category',
  MESSAGE_REQUIRED: 'Message is required',
  MESSAGE_MIN: 'Message must be at least 10 characters',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again.',
} as const;

/**
 * Employer Registration Form Schema
 * Fields: name, phone, email, city, hours
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
    .matches(/^[0-9]{10}$/, ERROR_MESSAGES.PHONE_INVALID),
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
 * TODO: Confirm fields with website owner
 */
export const partnerRegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN)
    .matches(/^[A-Za-z\s]+$/, ERROR_MESSAGES.NAME_ALPHA),
  phone: yup
    .string()
    .required(ERROR_MESSAGES.PHONE_REQUIRED)
    .matches(/^[0-9]{10,12}$/, ERROR_MESSAGES.PHONE_INVALID),
  email: yup
    .string()
    .required(ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  city: yup
    .string()
    .required(ERROR_MESSAGES.CITY_REQUIRED),
  company: yup.string().optional(),
  message: yup.string().optional(),
});

/**
 * Refer an Employee Form Schema
 * TODO: Confirm fields with website owner
 */
export const referEmployeeSchema = yup.object().shape({
  jobCategory: yup
    .string()
    .required(ERROR_MESSAGES.JOB_REQUIRED)
    .min(1, ERROR_MESSAGES.JOB_REQUIRED),
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN),
  phone: yup
    .string()
    .required(ERROR_MESSAGES.PHONE_REQUIRED)
    .matches(/^[0-9]{10,12}$/, ERROR_MESSAGES.PHONE_INVALID),
  experience: yup.string().optional(),
  city: yup.string().optional(),
  message: yup.string().optional(),
});

/**
 * Feedback Form Schema
 * TODO: Confirm fields with website owner
 */
export const feedbackSchema = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.NAME_MIN),
  phone: yup
    .string()
    .required(ERROR_MESSAGES.PHONE_REQUIRED)
    .matches(/^[0-9]{10}$/, ERROR_MESSAGES.PHONE_INVALID),
  email: yup
    .string()
    .required(ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  rating: yup.string().optional(),
  message: yup
    .string()
    .required(ERROR_MESSAGES.MESSAGE_REQUIRED)
    .min(10, ERROR_MESSAGES.MESSAGE_MIN),
});

export type EmployerRegistrationFormData = yup.InferType<typeof employerRegistrationSchema>;
export type PartnerRegistrationFormData = yup.InferType<typeof partnerRegistrationSchema>;
export type ReferEmployeeFormData = yup.InferType<typeof referEmployeeSchema>;
export type FeedbackFormData = yup.InferType<typeof feedbackSchema>;
