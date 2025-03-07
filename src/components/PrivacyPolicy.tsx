
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo Eatly intégré en SVG et centré */}
      <div className="mb-6">
        <svg
          width="160"
          height="160"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <path
            d="M50 100h100c10 0 10-10 10-20h-120c0 10 0 20 10 20z"
            fill="#D11B19"
          />
          <path
            d="M40 80h120c0-30-50-40-60-40s-60 10-60 40z"
            fill="#9C1B1A"
          />
          <circle cx="100" cy="40" r="5" fill="black" />
        </svg>
      </div>

      {/* Titre "Confidentialité" repositionné et stylisé */}
      <h2 className="text-[#9C1B1A] text-2xl font-semibold text-center mb-4">
        Confidentialité
      </h2>

      <hr className="w-20 border-[#EDE6D6] mb-6" />

      {/* Texte explicatif */}
      <p className="text-gray-700 text-center px-6 max-w-md leading-relaxed">
        Eatly respecte votre vie privée. Voulez-vous partager des données
        d'utilisation anonymes pour améliorer votre expérience ?
      </p>

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button className="w-40 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
          Refuser
        </button>
        <button className="w-40 px-6 py-3 bg-[#D11B19] text-white rounded-md hover:bg-[#9C1B1A] transition">
          Accepter
        </button>
      </div>

      {/* Lien vers la politique de confidentialité */}
      <p className="text-center mt-6 text-sm text-[#9C1B1A] cursor-pointer hover:underline">
        En savoir plus sur notre politique de confidentialité
      </p>
    </div>
  );
};

export default PrivacyPolicy;
