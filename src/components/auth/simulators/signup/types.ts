
export interface SignUpFormProps {
  onSuccess?: (user: any) => void;
  className?: string;
}

export interface BirthdateValidationProps {
  onChange: (date: string | null) => void;
  onValidate: (isValid: boolean) => void;
  errorMessage?: string;
}
