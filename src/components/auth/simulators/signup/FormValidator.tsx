
import { defaultErrorMessages } from '@/utils/error-translator';
import { BirthdateValidationProps } from './types';

export interface ValidationErrors {
  [key: string]: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string | null;
  birthdateValid: boolean;
  acceptTerms: boolean;
}

export const isDevMode = (): boolean => {
  return (
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('127.0.0.1') ||
    window.location.hostname.includes('lovableproject.com') ||
    window.location.hostname.includes('preview--') ||
    window.location.search.includes('dev=true')
  );
};

export const validateSignUpForm = (
  formData: SignUpFormData
): ValidationErrors => {
  // In development mode, skip validation if the dev flag is set
  if (isDevMode() && window.location.search.includes('dev=true')) {
    console.log('[DEV MODE] Validation bypassed in development mode with dev=true flag');
    return {};
  }
  
  const errors: ValidationErrors = {};
  
  // Validate first name
  if (!formData.firstName.trim()) {
    errors.firstName = defaultErrorMessages.required;
  }
  
  // Validate last name
  if (!formData.lastName.trim()) {
    errors.lastName = defaultErrorMessages.required;
  }
  
  // Validate email
  if (!formData.email.trim()) {
    errors.email = defaultErrorMessages.required;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = defaultErrorMessages.email;
  }
  
  // Validate birthdate
  if (!formData.birthdate || !formData.birthdateValid) {
    errors.birthdate = "Veuillez indiquer une date de naissance valide (18 ans minimum)";
  }
  
  // Validate password
  if (!formData.password) {
    errors.password = defaultErrorMessages.required;
  } else if (formData.password.length < 6) {
    errors.password = defaultErrorMessages.shortPassword;
  }
  
  // Validate confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = defaultErrorMessages.required;
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = defaultErrorMessages.passwordMatch;
  }
  
  // Validate terms
  if (!formData.acceptTerms) {
    errors.terms = defaultErrorMessages.terms;
  }
  
  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
