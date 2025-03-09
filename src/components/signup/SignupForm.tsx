import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FormErrorDisplay from './FormErrorDisplay';
import BirthdateField from './BirthdateField';
import PersonalInfoFields from './PersonalInfoFields';
import PasswordInput from './PasswordInput';
import TermsAndNewsletter from './TermsAndNewsletter';
import SignupButton from './SignupButton';
import { useSignupForm } from '@/hooks/useSignupForm';
import { useToast } from '@/hooks/use-toast';
import { translateErrorMessage } from '@/utils/error-messages';
import '@/styles/form-errors.css';

const SignupForm = () => {
  const { 
    formState, 
    errors, 
    isSubmitting, 
    isLoading, 
    error,
    updateField, 
    handleBirthdateChange, 
    handleBirthdateValidation, 
    handleSubmit 
  } = useSignupForm();
  
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (error) {
      const translatedError = translateErrorMessage(error);
      toast({
        title: "Erreur d'inscription",
        description: translatedError,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  return (
    <>
      <FormErrorDisplay error={errors.formError} className="bg-red-50 p-3 rounded-md mb-4" />

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="space-y-4" 
        noValidate
      >
        <PersonalInfoFields 
          firstName={formState.firstName}
          lastName={formState.lastName}
          email={formState.email}
          onFirstNameChange={(value) => updateField('firstName', value)}
          onLastNameChange={(value) => updateField('lastName', value)}
          onEmailChange={(value) => updateField('email', value)}
        />

        <BirthdateField 
          onChange={handleBirthdateChange}
          onValidate={handleBirthdateValidation}
          errorMessage={errors.birthdateError}
        />

        <PasswordInput 
          password={formState.password}
          confirmPassword={formState.confirmPassword}
          showPassword={formState.showPassword}
          onPasswordChange={(value) => updateField('password', value)}
          onConfirmPasswordChange={(value) => updateField('confirmPassword', value)}
          onToggleShowPassword={() => updateField('showPassword', !formState.showPassword)}
        />

        <TermsAndNewsletter
          acceptTerms={formState.acceptTerms}
          newsletter={formState.newsletter}
          onTermsChange={(value) => updateField('acceptTerms', value)}
          onNewsletterChange={(value) => updateField('newsletter', value)}
        />

        <SignupButton isLoading={isSubmitting || isLoading} />
      </form>
    </>
  );
};

export default SignupForm;
