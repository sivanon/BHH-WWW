@echo off
git config user.name "Sivanon"
git config user.email "sivanon@hospital.website"
git add .
git branch -M main
git commit -m "Initial commit for BHH Website"
git push -u origin main
