
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { setupFormValidation } from '@/utils/error-messages';
import BirthdateSelector from './BirthdateSelector';
import FormErrorDisplay from './FormErrorDisplay';
import PasswordInput from './PasswordInput';
import TermsAndNewsletter from './TermsAndNewsletter';
import SignupButton from './SignupButton';
import InputField from './InputField';
import QuickSignupButton from './QuickSignupButton';
import { useSignupForm } from '@/hooks/signup/useSignupForm';

const SignupForm = () => {
  const { 
    formState, 
    formSetters, 
    formHandlers 
  } = useSignupForm();

  const { 
    email, password, confirmPassword, firstName, lastName,
    birthdateError, showPassword, acceptTerms, newsletter,
    formError, isLoading, inPreviewMode
  } = formState;

  const {
    setEmail, setPassword, setConfirmPassword, setFirstName,
    setLastName, setShowPassword, setAcceptTerms, setNewsletter
  } = formSetters;

  const {
    handleSignup, handleBirthdateChange, handleBirthdateValidation
  } = formHandlers;

  useEffect(() => {
    setupFormValidation();
  }, []);

  return (
    <>
      <FormErrorDisplay error={formError} className="bg-red-50 p-3 rounded-md mb-4" />

      {inPreviewMode && <QuickSignupButton />}

      <form onSubmit={handleSignup} className="space-y-4" noValidate>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <InputField
            type="text"
            value={firstName}
            onChange={setFirstName}
            placeholder="Prénom"
            required
            name="firstName"
          />
          <InputField
            type="text"
            value={lastName}
            onChange={setLastName}
            placeholder="Nom"
            required
            name="lastName"
          />
        </div>

        <InputField
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          required
          name="email"
        />

        <div className="mt-4">
          <BirthdateSelector 
            onChange={handleBirthdateChange} 
            onValidate={handleBirthdateValidation} 
          />
          <FormErrorDisplay error={birthdateError} className="mt-1" />
        </div>

        <PasswordInput 
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
        />

        <TermsAndNewsletter
          acceptTerms={acceptTerms}
          newsletter={newsletter}
          onTermsChange={setAcceptTerms}
          onNewsletterChange={setNewsletter}
        />

        <SignupButton isLoading={isLoading} />
      </form>
    </>
  );
};

export default SignupForm;
