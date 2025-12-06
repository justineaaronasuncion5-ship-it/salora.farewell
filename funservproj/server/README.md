Gemini Proxy for FunServ Website

Overview
--------
This small Express server proxies chat messages from the website to Google's Generative AI (Gemini). It keeps your API key off the client and returns the AI text back to the frontend.

Quick start (Windows PowerShell)
--------------------------------
1. Install Node.js (v16+ recommended).
2. Open PowerShell and run:

```powershell
cd server
npm install
$env:GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY_HERE"
node index.js
```

3. Update your website to POST to `http://localhost:3000/api/gemini` with JSON `{ "message": "..." }`.

Notes and security
------------------
- Using an API key in query string is simple for development, but for production you should use a service account and proper OAuth or restrict the key.
- The proxy attempts to handle varying Gemini response shapes but you may need to adapt the parsing to your specific model/version.
- Set `GEMINI_MODEL` environment variable if you'd like to target a different model (default `models/gemini-1.0`).
