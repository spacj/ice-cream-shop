#!/bin/bash

# Gelato Luxe - Quick Start Setup Script
# This script automates the initial project setup

echo "🍦 Welcome to Gelato Luxe Setup!"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not found. Please install Node.js 18+ from https://nodejs.org${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) is installed${NC}"
echo ""

# Check if npm is installed
echo -e "${BLUE}Checking npm installation...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}npm not found. Please install npm.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v) is installed${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${YELLOW}Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Create .env.local from example
if [ ! -f .env.local ]; then
    echo -e "${BLUE}Creating .env.local file...${NC}"
    cp .env.local.example .env.local
    echo -e "${GREEN}✓ .env.local created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env.local with your Firebase credentials${NC}"
else
    echo -e "${YELLOW}ℹ️  .env.local already exists${NC}"
fi
echo ""

# Create public directories
echo -e "${BLUE}Creating public directories...${NC}"
mkdir -p public/images
mkdir -p public/videos
echo -e "${GREEN}✓ Public directories created${NC}"
echo ""

# Summary
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Firebase credentials"
echo "2. Create Firestore collections (see SETUP_GUIDE.md)"
echo "3. Create an admin user in Firebase"
echo "4. Add images to public/images/"
echo "5. Run: npm run dev"
echo ""
echo "For detailed setup instructions, see SETUP_GUIDE.md"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
