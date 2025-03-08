#!/bin/bash

echo "🚀 Installation des composants Eatly dans Lovable..."

# Définition des couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour les messages
print_status() {
    echo -e "${2}$1${NC}"
}

# Vérification du repository
REPO_URL="https://github.com/Trouyou/premium-splash-magic-v1.git"
REPO_NAME="premium-splash-magic-v1"

if [ ! -d "../$REPO_NAME" ]; then
    print_status "📥 Clonage du repository Lovable..." "$YELLOW"
    cd ..
    git clone $REPO_URL
    cd $REPO_NAME
else
    print_status "📂 Utilisation du repository existant..." "$YELLOW"
    cd "../$REPO_NAME"
    git pull origin main
fi

# Création d'une sauvegarde
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="../${REPO_NAME}_backup_$timestamp"
print_status "📦 Création d'une sauvegarde dans $backup_dir..." "$YELLOW"
cp -r . "$backup_dir"

# Vérification de la structure
print_status "🔍 Vérification de la structure du projet..." "$YELLOW"
mkdir -p src/components/splash
mkdir -p public/lovable-uploads
mkdir -p src/styles

# Copie des fichiers
print_status "📝 Copie des composants..." "$YELLOW"
cp -r src/components/LogoImage.tsx src/components/
cp -r src/components/splash/* src/components/splash/

print_status "🖼️ Copie des ressources..." "$YELLOW"
cp -r public/lovable-uploads/* public/lovable-uploads/

# Fusion des styles Tailwind
print_status "🎨 Mise à jour des styles..." "$YELLOW"
echo -e "\n/* Styles Eatly ajoutés automatiquement */\n" >> src/styles/globals.css
cat src/styles/globals.css >> src/styles/globals.css

# Vérification des dépendances
print_status "📦 Vérification des dépendances..." "$YELLOW"
if ! grep -q "framer-motion" package.json; then
    print_status "⚠️ framer-motion n'est pas installé. Installation..." "$YELLOW"
    npm install framer-motion@latest
fi

if ! grep -q "@tailwindcss/aspect-ratio" package.json; then
    print_status "⚠️ @tailwindcss/aspect-ratio n'est pas installé. Installation..." "$YELLOW"
    npm install @tailwindcss/aspect-ratio
fi

if ! grep -q "@tailwindcss/forms" package.json; then
    print_status "⚠️ @tailwindcss/forms n'est pas installé. Installation..." "$YELLOW"
    npm install @tailwindcss/forms
fi

# Nettoyage et build
print_status "🧹 Nettoyage et build..." "$YELLOW"
npm run clean 2>/dev/null || print_status "⚠️ La commande 'npm run clean' n'est pas disponible" "$YELLOW"
npm run build

# Commit des changements
print_status "📤 Commit des changements..." "$YELLOW"
git add .
git commit -m "feat: mise à jour des composants Eatly"
git push origin main

print_status "✅ Installation terminée avec succès !" "$GREEN"
print_status "📘 Consultez le README.md pour les instructions d'utilisation." "$GREEN"
print_status "💾 Une sauvegarde a été créée dans : $backup_dir" "$YELLOW"
print_status "🔄 Redémarrez votre serveur de développement pour appliquer les changements." "$YELLOW"
