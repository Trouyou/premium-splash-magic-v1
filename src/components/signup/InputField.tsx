
import { useState, useEffect } from 'react';
import FormErrorDisplay from './FormErrorDisplay';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  validate?: (value: string) => string;
  onBlur?: () => void;
  pattern?: string;
  name?: string;
}

const InputField = ({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  className = '',
  validate,
  onBlur,
  pattern,
  name
}: InputFieldProps) => {
  const [error, setError] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Clear errors when value changes
  useEffect(() => {
    if (isDirty) {
      validateInput();
    }
  }, [value]);

  const validateInput = () => {
    // Required validation
    if (required && !value.trim()) {
      setError('Ce champ est requis');
      return false;
    }
    
    // Minimum length validation
    if (minLength && value.trim().length < minLength) {
      setError(`Ce champ doit contenir au moins ${minLength} caractères`);
      return false;
    }
    
    // Email validation
    if (type === 'email' && value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setError('Veuillez entrer une adresse email valide');
        return false;
      }
    }
    
    // Custom validation
    if (validate) {
      const customError = validate(value);
      if (customError) {
        setError(customError);
        return false;
      }
    }
    
    // No errors
    setError('');
    return true;
  };

  const handleBlur = () => {
    setIsDirty(true);
    validateInput();
    if (onBlur) onBlur();
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all ${
    error ? 'border-eatly-primary bg-red-50' : 'border-gray-300'
  } ${className}`;

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        minLength={minLength}
        onBlur={handleBlur}
        pattern={pattern}
        aria-invalid={!!error}
      />
      <FormErrorDisplay error={error} className="mt-1" />
    </div>
  );
};

export default InputField;
