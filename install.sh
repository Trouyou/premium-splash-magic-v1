#!/bin/bash
echo "🚀 Installation des composants Eatly pour Lovable..."
mkdir -p src/components public/lovable-uploads
echo "📦 Extraction des fichiers..." && unzip -o public/lovable_updates.zip
echo "📋 Copie des composants..." && cp -r src/components/* src/components/ && cp -r public/lovable-uploads/* public/lovable-uploads/
echo "✅ Installation terminée !"
