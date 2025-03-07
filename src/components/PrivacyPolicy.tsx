
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        {/* Logo Eatly - Centrage et agrandissement */}
        <div className="flex justify-center mb-8">
          <img
            src="/Logo_Eatly_Original_1.png"
            alt="Eatly Logo"
            className="w-40 h-auto transition-transform duration-500 ease-out transform hover:scale-105"
            loading="eager"
          />
        </div>

        {/* Titre */}
        <h2 className="text-[#9C1B1A] text-xl font-semibold text-center mb-4">
          Confidentialité
        </h2>

        <hr className="my-4 border-[#EDE6D6]" />

        {/* Texte explicatif */}
        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          Eatly respecte votre vie privée. Voulez-vous partager des données
          d'utilisation anonymes pour améliorer votre expérience ?
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-300">
            Refuser
          </button>
          <button className="w-full sm:w-auto px-6 py-3 bg-[#D11B19] text-white rounded-md hover:bg-[#9C1B1A] transition-all duration-300">
            Accepter
          </button>
        </div>

        {/* Lien vers la politique de confidentialité */}
        <p className="text-center mt-6 text-sm text-[#9C1B1A] cursor-pointer hover:underline">
          En savoir plus sur notre politique de confidentialité
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
