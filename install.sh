#!/bin/bash

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Installation des composants Lovable...${NC}"

# Vérification de l'existence du dossier src
if [ ! -d "src" ]; then
    echo -e "${RED}Erreur : Le dossier 'src' n'existe pas. Assurez-vous d'être dans le bon répertoire.${NC}"
    exit 1
fi

# Création des dossiers nécessaires
mkdir -p src/components/splash
mkdir -p src/components/ui
mkdir -p src/components/login
mkdir -p src/styles
mkdir -p public/lovable-uploads

# Décompression des fichiers
echo -e "${YELLOW}Décompression des fichiers...${NC}"
unzip -o lovable_updates.zip

# Vérification des dépendances dans package.json
echo -e "${YELLOW}Vérification des dépendances...${NC}"

# Liste des dépendances requises
dependencies=(
    "framer-motion"
    "@radix-ui/react-dialog"
    "@radix-ui/react-slot"
    "@tanstack/react-query"
    "class-variance-authority"
    "clsx"
    "tailwind-merge"
    "tailwindcss-animate"
)

# Vérification et installation des dépendances
for dep in "${dependencies[@]}"; do
    if ! grep -q "\"$dep\"" package.json; then
        echo -e "${YELLOW}Installation de $dep...${NC}"
        npm install $dep
    fi
done

# Mise à jour de la configuration Tailwind
echo -e "${YELLOW}Mise à jour de la configuration Tailwind...${NC}"
cp tailwind.config.ts ./

# Mise à jour de la configuration Next.js
echo -e "${YELLOW}Mise à jour de la configuration Next.js...${NC}"
cp next.config.js ./

echo -e "${GREEN}Installation terminée avec succès !${NC}"
echo -e "${YELLOW}N'oubliez pas de redémarrer votre serveur de développement.${NC}"
