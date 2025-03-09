
import BirthdateSelector from './BirthdateSelector';
import FormErrorDisplay from './FormErrorDisplay';

interface BirthdateFieldProps {
  onChange: (date: string | null) => void;
  onValidate: (isValid: boolean) => void;
  errorMessage: string;
}

const BirthdateField = ({
  onChange,
  onValidate,
  errorMessage
}: BirthdateFieldProps) => {
  return (
    <div className="mt-4 birthdate-field-container">
      <BirthdateSelector 
        onChange={onChange} 
        onValidate={onValidate}
        errorMessage={errorMessage}
      />
      {errorMessage && <FormErrorDisplay error={errorMessage} className="mt-1" />}
    </div>
  );
};

export default BirthdateField;
