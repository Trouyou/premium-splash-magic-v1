
import { useNavigate } from 'react-router-dom';

const SignupFooter = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center mt-8">
      <p className="text-gray-700">
        Déjà un compte?{" "}
        <button 
          className="text-eatly-secondary font-semibold hover:underline"
          onClick={() => navigate('/login')}
        >
          Se connecter
        </button>
      </p>
    </div>
  );
};

export default SignupFooter;
