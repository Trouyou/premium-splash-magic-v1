#!/bin/bash

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Installation des composants Lovable...${NC}"

# Vérification de l'existence du dossier src
if [ ! -d "src" ]; then
    echo -e "${YELLOW}Création du dossier src...${NC}"
    mkdir -p src
fi

# Création des dossiers nécessaires
echo -e "${YELLOW}Création des dossiers...${NC}"
mkdir -p src/components/splash
mkdir -p src/components/ui
mkdir -p src/components/login
mkdir -p src/styles
mkdir -p public/lovable-uploads

# Vérification du fichier zip
if [ ! -f "lovable_updates.zip" ]; then
    echo -e "${YELLOW}Téléchargement du package...${NC}"
    curl -O https://raw.githubusercontent.com/Trouyou/premium-splash-magic-v1/main/lovable_updates.zip
    if [ $? -ne 0 ]; then
        echo -e "${RED}Erreur lors du téléchargement du package.${NC}"
        exit 1
    fi
fi

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

# Vérification de l'existence de package.json
if [ ! -f "package.json" ]; then
    echo -e "${RED}Erreur : package.json non trouvé. Initialisation d'un nouveau projet...${NC}"
    npm init -y
fi

# Installation des dépendances
for dep in "${dependencies[@]}"; do
    if ! grep -q "\"$dep\"" package.json 2>/dev/null; then
        echo -e "${YELLOW}Installation de $dep...${NC}"
        npm install $dep --save
    fi
done

# Mise à jour de la configuration Tailwind
echo -e "${YELLOW}Mise à jour de la configuration Tailwind...${NC}"
if [ -f "tailwind.config.ts" ]; then
    cp tailwind.config.ts ./
fi

# Mise à jour de la configuration Next.js
echo -e "${YELLOW}Mise à jour de la configuration Next.js...${NC}"
if [ -f "next.config.js" ]; then
    cp next.config.js ./
fi

echo -e "${GREEN}Installation terminée avec succès !${NC}"
echo -e "${YELLOW}N'oubliez pas de redémarrer votre serveur de développement.${NC}"

# Instructions post-installation
echo -e "\n${YELLOW}Instructions post-installation :${NC}"
echo -e "1. Vérifiez que les composants ont été correctement installés dans src/components"
echo -e "2. Assurez-vous que les styles sont présents dans src/styles"
echo -e "3. Vérifiez que les images sont dans public/lovable-uploads"
echo -e "4. Redémarrez votre serveur de développement avec 'npm run dev'"
