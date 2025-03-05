#!/bin/bash

# Script to remove large video files from Git history
# This will rewrite Git history, so make sure all collaborators are aware

echo "This script will remove large video files from Git history."
echo "This is a destructive operation that rewrites Git history."
echo "Make sure all collaborators are aware and have pushed their changes."
echo ""
echo "Press Ctrl+C to cancel or Enter to continue..."
read

# Create a temporary directory for the filter-repo tool
mkdir -p tmp

# Use git filter-repo to remove the large video files
# First, check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null; then
    echo "git-filter-repo is not installed. Installing..."
    pip install git-filter-repo
fi

# Remove the large video files from history
echo "Removing large video files from Git history..."
git filter-repo --path assets/videos/zen_sand_raking_1080k.mov --invert-paths --force
git filter-repo --path assets/videos/hero-background.mp4 --invert-paths --force
git filter-repo --path assets/videos/hero-background.webm --invert-paths --force

# Clean up
echo "Cleaning up..."
git gc --aggressive --prune=now

# Update .gitignore to exclude these files in the future
echo "Updating .gitignore..."
# This is already done in the previous step

echo ""
echo "Done! The repository size should now be smaller."
echo "You'll need to force push these changes with: git push --force"
echo ""
echo "Note: All collaborators will need to clone the repository again after this operation." 