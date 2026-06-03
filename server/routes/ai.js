const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post('/suggest', async (req, res) => {
  const { title, description, priority } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'Sos un asistente de productividad. Dado el título y descripción de una tarea, generá una sugerencia corta y útil (máximo 2 oraciones) sobre cómo abordarla. Respondé siempre en español.'
        },
        {
          role: 'user',
          content: `Tarea: ${title}\nDescripción: ${description || 'Sin descripción'}\nPrioridad: ${priority}`
        }
      ],
      max_tokens: 100
    });

    const suggestion = completion.choices[0].message.content;
    res.json({ suggestion });
  } catch (err) {
    console.error('❌ Error Groq:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;