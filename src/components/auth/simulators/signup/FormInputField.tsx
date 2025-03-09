
import React from 'react';

interface FormInputFieldProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  id?: string;
}

const FormInputField = ({
  type,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  id
}: FormInputFieldProps) => {
  return (
    <div>
      <input
        type={type}
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
    </div>
  );
};

export default FormInputField;
