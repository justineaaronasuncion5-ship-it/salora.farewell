const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Required: set GOOGLE_API_KEY environment variable or configure accordingly
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'models/gemini-1.0';

app.post('/api/gemini', async (req, res) => {
  try {
    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'Missing GOOGLE_API_KEY environment variable. See server/README.md' });
    }

    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Missing `message` in request body' });

    // Basic system prompt to give Lora personality
    const prompt = `You are Lora, a compassionate assistant for a memorial services website. Answer clearly, empathetically, and concisely. User: ${message}`;

    // POST to Google Generative API using API key (query param). Adjust payload according to Google's API version if necessary.
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/${MODEL}:generate?key=${GOOGLE_API_KEY}`;

    const body = {
      prompt: {
        text: prompt
      },
      temperature: 0.7,
      maxOutputTokens: 512
    };

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('Gemini API error:', r.status, text);
      return res.status(502).json({ error: 'Gemini API error', details: text });
    }

    const data = await r.json();

    // Attempt to extract response text from common fields. API response shapes vary by version.
    let aiText = null;
    if (data.output && Array.isArray(data.output) && data.output[0] && data.output[0].content) {
      // Some versions provide output[].content[] with text
      const content = data.output[0].content;
      if (Array.isArray(content)) {
        aiText = content.map(c => (c.text || '')).join(' ').trim();
      }
    }
    if (!aiText && data.candidates && data.candidates[0] && data.candidates[0].output) {
      aiText = data.candidates[0].output;
    }
    if (!aiText && data.outputText) aiText = data.outputText;
    if (!aiText && typeof data === 'object') aiText = JSON.stringify(data).substring(0, 1000);

    return res.json({ text: aiText || 'No text returned from Gemini API' });
  } catch (err) {
    console.error('Server error calling Gemini:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server listening on http://localhost:${PORT}`);
});
