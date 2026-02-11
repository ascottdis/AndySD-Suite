# AndySD Studio — Static Master Site

This folder is a deployable static master site + progress HUD system.

## What you get
- index.html (Landing: Hiring + Services + Live Apps)
- hiring.html (Dedicated hiring funnel)
- services.html (Dedicated services funnel)
- suite.css (Global elite design system)
- suite.js (Smooth scroll + flip animation + progress HUD renderer)
- /data/projects.json (Single source of truth for app progress)
- /work/* (Six pillar pages: GigOS, outFLIP, ArtPeriod, Aperture, Transit Hub, Studio)

## Run locally
1) Install serve (once):
   npm install -g serve

2) Start server:
   cd C:\Users\Andy\andysd-suite
   serve . -l 3000

Open:
- http://localhost:3000
- http://localhost:3000/work/gigos/
- http://localhost:3000/work/flippin/