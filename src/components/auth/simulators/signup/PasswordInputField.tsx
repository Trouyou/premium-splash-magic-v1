
import React, { useState } from 'react';

interface PasswordInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  id?: string;
  showPasswordState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const PasswordInputField = ({
  value,
  onChange,
  placeholder,
  error,
  required = false,
  id,
  showPasswordState
}: PasswordInputFieldProps) => {
  const [localShowPassword, setLocalShowPassword] = useState(false);
  
  // Use provided state or local state
  const [showPassword, setShowPassword] = showPasswordState || [localShowPassword, setLocalShowPassword];

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id || placeholder.toLowerCase()}-error` : undefined}
        id={id}
      />
      {error && (
        <div id={`${id || placeholder.toLowerCase()}-error`} className="text-red-600 text-sm mt-1">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInputField;
