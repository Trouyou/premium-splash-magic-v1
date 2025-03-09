
/**
 * Exports for error messages and form validation utilities
 */

// Core error translation utilities
export { translateErrorMessage } from './translator';
export { getSignupFormError } from './form-validation';
export { setupFormValidation } from './validation-setup';
export { defaultErrorMessages } from './dictionary';

// Error harmonization utilities (new modular approach)
export { setupErrorMessageHarmonization } from './harmonize-core';
export { harmonizeErrorMessages } from './harmonize-dom';
export { enhanceSubmitButton, setupSafeEnterKeyBehavior } from './harmonize-form';
export { setupSafetyMechanisms } from './harmonize-safety';
export { applyErrorStyles } from './harmonize-styles';
