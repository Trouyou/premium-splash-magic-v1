
import { Button } from '@/components/ui/button';
import { simulateSignUp } from '@/utils/auth-simulator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface QuickSignupButtonProps {
  className?: string;
}

const QuickSignupButton = ({ className }: QuickSignupButtonProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuickSignup = async () => {
    try {
      await simulateSignUp(
        'test@example.com',
        'password123',
        'John',
        'Doe',
        '1990-01-01'
      );
      
      toast({
        title: "Inscription rapide simulée",
        description: "Mode prévisualisation - redirection vers l'onboarding",
      });
      
      navigate('/onboarding');
    } catch (error: any) {
      console.error("Erreur d'inscription rapide:", error);
    }
  };

  return (
    <Button
      onClick={handleQuickSignup}
      className={`w-full mb-4 bg-yellow-500 hover:bg-yellow-600 text-white ${className}`}
      type="button"
    >
      Simulation Rapide (Mode Dev)
    </Button>
  );
};

export default QuickSignupButton;
