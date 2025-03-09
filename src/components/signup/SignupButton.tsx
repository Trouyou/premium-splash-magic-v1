
interface SignupButtonProps {
  isLoading: boolean;
}

const SignupButton = ({ isLoading }: SignupButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 px-4 bg-eatly-primary text-white rounded-lg font-avantgarde tracking-wide transition-all ${
        isLoading ? "opacity-80" : "hover:bg-eatly-secondary"
      } flex justify-center items-center`}
      onClick={() => {
        // Ajout d'un temps de garde lors d'un clic pour éviter les gels
        if (isLoading) {
          // Empêcher l'action si déjà en chargement
          return false;
        }
      }}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {isLoading ? "Inscription en cours..." : "S'inscrire"}
    </button>
  );
};

export default SignupButton;
