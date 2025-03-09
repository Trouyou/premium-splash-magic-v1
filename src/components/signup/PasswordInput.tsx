
import { Eye, EyeOff } from 'lucide-react';
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
  return (
    <>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Mot de passe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
          required
          minLength={8}
          onInvalid={(e) => {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            input.setCustomValidity(
              input.value.length === 0 
                ? defaultErrorMessages.required 
                : defaultErrorMessages.shortPassword
            );
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.setCustomValidity('');
          }}
        />
        <button
          type="button"
          onClick={onToggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="Confirmer le mot de passe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
          required
          onInvalid={(e) => {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            input.setCustomValidity(
              input.value.length === 0 
                ? defaultErrorMessages.required 
                : defaultErrorMessages.passwordMatch
            );
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.setCustomValidity('');
          }}
        />
      </div>
    </>
  );
};

export default PasswordInput;
