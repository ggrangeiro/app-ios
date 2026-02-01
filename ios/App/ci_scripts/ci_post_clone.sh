#!/bin/sh

# Fail on any error
set -e

# Go to the root of the project
# CI_PRIMARY_REPOSITORY_PATH is provided by Xcode Cloud
cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "📍 Directory: $(pwd)"

# Install Node.js using Homebrew (pre-installed on Xcode Cloud)
echo "📦 Installing Node.js..."
brew install node

# Install npm dependencies
echo "📦 Installing dependencies..."
npm install

# Build web assets
echo "🏗️ Building web app..."
npm run build

# Sync Capacitor native project
echo "🔄 Syncing Capacitor..."
npx cap sync ios

echo "✅ Pre-build setup complete!"
