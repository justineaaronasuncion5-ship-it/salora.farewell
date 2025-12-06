Python Gemini Proxy (Flask)
=================================

Overview
--------
This small Flask app accepts POST requests at `/api/gemini` with JSON `{ "message": "..." }` and returns Gemini's generated text. It keeps Google credentials on the server (never in client JS).

Prerequisites
-------------
- Python 3.10+ installed
- A Google Cloud project with the Generative AI API enabled
- A service account JSON key downloaded (see steps below)

Setup (Windows PowerShell)
--------------------------
1. Open PowerShell and navigate to the project `server_py` folder:

```powershell
cd 'C:\Users\Jus\Desktop\funservproj\server_py'
```

2. (Optional) Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

4. Create or obtain a Google service account JSON key and set the environment variable:

 - In Google Cloud Console: IAM & Admin → Service Accounts → Create Service Account.
 - Grant the service account the role `Cloud AI Developer` (or appropriate roles for Generative AI access).
 - Create a JSON key and download it.

Then in PowerShell:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\to\service-account.json'
# Optional: set model and port
$env:GEMINI_MODEL = 'gemini-2.5-flash'
$env:PORT = '3000'
python app.py
```

5. Keep the server running and open your website (served via `http://localhost` or similar). The frontend can POST to `http://localhost:3000/api/gemini`.

Notes & Security
----------------
- Do NOT commit your service account JSON to source control.
- For production, host this Flask app on a secure server (HTTPS) and restrict the service account key.
- If you prefer using the Node proxy already added, you can keep either — both approaches keep keys off client-side code.
