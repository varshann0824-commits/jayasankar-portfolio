
## Verified implementation notes

The public SmartFarm repository manifest and source use React, TypeScript, Vite, Tailwind CSS, Supabase, React Router, Framer Motion, and Three.js-related packages. The source includes weather services with IMD/Open-Meteo handling, a market-price flow that proxies AGMARKNET through a Supabase Edge Function, crop recommendation logic, crop-health and saved-observation flows, and authenticated Supabase-backed farm/task/device data paths.

The Talk page implements voice input/output and text fallback, multilingual language handling, and AI query processing through the app's assistant service. Crop-monitoring source code explicitly distinguishes saved observations and weather data from unavailable physical sensor readings; sensor setup and ingestion code are present as development groundwork. The portfolio therefore labels this exposure carefully and does not claim field deployment or autonomous-agent expertise.

Sources: https://github.com/varshann0824-commits/smartfarm-ai-app and https://smartfarm-ai-app.vercel.app/
