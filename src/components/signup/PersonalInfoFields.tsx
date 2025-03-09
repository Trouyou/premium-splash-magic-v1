
import InputField from './InputField';

interface PersonalInfoFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const PersonalInfoFields = ({
  firstName,
  lastName,
  email,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange
}: PersonalInfoFieldsProps) => {
  return (
    <>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <InputField
          type="text"
          value={firstName}
          onChange={onFirstNameChange}
          placeholder="Prénom"
          required
          name="firstName"
        />
        <InputField
          type="text"
          value={lastName}
          onChange={onLastNameChange}
          placeholder="Nom"
          required
          name="lastName"
        />
      </div>

      <InputField
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        required
        name="email"
      />
    </>
  );
};

export default PersonalInfoFields;
