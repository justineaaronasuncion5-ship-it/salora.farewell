import os
from flask import Flask, request, jsonify
from google import genai
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure client
# The Google GenAI Python SDK uses application default credentials.
# Set GOOGLE_APPLICATION_CREDENTIALS to point to your service account JSON file.
client = genai.Client()

MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.5-flash')


@app.route('/api/gemini', methods=['POST'])
def gemini_generate():
    data = request.get_json(force=True)
    message = data.get('message') if data else None
    if not message:
        return jsonify({'error': "Missing 'message' in request body"}), 400

    prompt = (
        f"You are Lora, a compassionate assistant for a memorial services website. "
        f"Answer clearly, empathetically, and concisely. User: {message}"
    )

    try:
        # Using the google genai client to generate text
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            temperature=0.7,
            max_output_tokens=512,
        )

        # SDK exposes text differently by version. Try common access patterns.
        text = None
        try:
            text = getattr(response, 'text', None)
        except Exception:
            text = None

        # Fallback: inspect response for fields
        if not text:
            # Some responses include .candidates or .output
            if isinstance(response, dict):
                # try 'candidates'
                cand = response.get('candidates')
                if cand and isinstance(cand, list) and cand[0].get('content'):
                    # join text fields
                    parts = []
                    for c in cand[0].get('content'):
                        if isinstance(c, dict) and c.get('text'):
                            parts.append(c.get('text'))
                    text = ' '.join(parts).strip()

        if not text:
            # Last resort: stringify
            text = str(response)[:2000]

        return jsonify({'text': text})

    except Exception as e:
        return jsonify({'error': 'Gemini request failed', 'details': str(e)}), 502


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=False)
