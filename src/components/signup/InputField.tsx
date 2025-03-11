import { useState, useEffect, useCallback } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Définir validateInput avec useCallback avant de l'utiliser dans useEffect
  const validateInput = useCallback(() => {
    // Required validation
    if (required && !value.trim()) {
      setError('Ce champ est requis');
      return false;
    }
    
    // Min length validation
    if (minLength && value.trim().length < minLength) {
      setError(`Ce champ doit contenir au moins ${minLength} caractères`);
      return false;
    }
    
    // Pattern validation
    if (pattern && !new RegExp(pattern).test(value)) {
      setError('Format invalide');
      return false;
    }
    
    // Custom validation
    if (validate) {
      const customError = validate(value);
      if (customError) {
        setError(customError);
        return false;
      }
    }
    
    setError(null);
    return true;
  }, [required, value, minLength, pattern, validate]);

  // Clear errors when value changes
  useEffect(() => {
    if (isDirty) {
      validateInput();
    }
  }, [value, isDirty, validateInput]);

  const handleBlur = () => {
    setIsDirty(true);
    validateInput();
    if (onBlur) onBlur();
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all ${
    error ? 'border-[#D11B19] bg-[rgba(209,27,25,0.05)] error' : 'border-gray-300'
  } ${className}`;

  return (
    <div className="w-full form-group">
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
        // Accessibilité améliorée
        aria-required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <FormErrorDisplay error={error} id={error ? `${name}-error` : undefined} />
    </div>
  );
};

export default InputField;
