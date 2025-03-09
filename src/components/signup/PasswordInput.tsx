
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormErrorDisplay from './FormErrorDisplay';
import { defaultErrorMessages } from '@/utils/error-messages';

interface PasswordInputProps {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onToggleShowPassword: () => void;
}

const PasswordInput = ({
  password,
  confirmPassword,
  showPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onToggleShowPassword
}: PasswordInputProps) => {
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isDirty, setIsDirty] = useState({ password: false, confirm: false });

  // Validate password when it changes (only if dirty)
  useEffect(() => {
    if (isDirty.password) {
      validatePassword();
    }
  }, [password]);

  // Validate confirm password when either password changes (only if dirty)
  useEffect(() => {
    if (isDirty.confirm) {
      validateConfirmPassword();
    }
  }, [confirmPassword, password]);

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Ce champ est requis');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmError('Ce champ est requis');
      return false;
    } else if (password !== confirmPassword) {
      setConfirmError('Les mots de passe ne correspondent pas');
      return false;
    }
    setConfirmError('');
    return true;
  };

  const handlePasswordBlur = () => {
    setIsDirty(prev => ({ ...prev, password: true }));
    validatePassword();
  };

  const handleConfirmBlur = () => {
    setIsDirty(prev => ({ ...prev, confirm: true }));
    validateConfirmPassword();
  };

  return (
    <>
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          onBlur={handlePasswordBlur}
          placeholder="Mot de passe"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all ${
            passwordError ? 'border-eatly-primary bg-red-50' : 'border-gray-300'
          }`}
          required
          minLength={8}
          aria-invalid={!!passwordError}
        />
        <button
          type="button"
          onClick={onToggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        <FormErrorDisplay error={passwordError} className="mt-1" />
      </div>

      <div className="mb-4">
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          onBlur={handleConfirmBlur}
          placeholder="Confirmer le mot de passe"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all ${
            confirmError ? 'border-eatly-primary bg-red-50' : 'border-gray-300'
          }`}
          required
          aria-invalid={!!confirmError}
        />
        <FormErrorDisplay error={confirmError} className="mt-1" />
      </div>
    </>
  );
};

export default PasswordInput;
