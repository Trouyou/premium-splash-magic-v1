
import React from 'react';

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  error?: string;
  required?: boolean;
}

const CheckboxField = ({
  id,
  checked,
  onChange,
  label,
  error,
  required = false
}: CheckboxFieldProps) => {
  return (
    <>
      <div className="flex items-start my-5 w-full">
        <div className="flex-shrink-0 mt-[3px]">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className={`min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary ${error ? 'border-red-500' : ''}`}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        </div>
        <label 
          htmlFor={id} 
          className="font-avantgarde text-sm leading-relaxed text-[#333333] ml-[10px] flex-1 text-left"
        >
          {label}
        </label>
      </div>
      {error && (
        <div id={`${id}-error`} className="text-red-600 text-sm mt-1 ml-[28px]">
          {error}
        </div>
      )}
    </>
  );
};

export default CheckboxField;
