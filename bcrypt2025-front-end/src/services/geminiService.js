import { GEMINI_API_URL } from '../config/api';

export const geminiService = {
  async sendMessage(text) {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.body.candidates[0].content.parts[0].text;
    }
    throw new Error('Error al comunicarse con Gemini');
  },

  async analyzeDocument(text, fileName) {
    const prompt = `Analiza el siguiente documento (${fileName}):\n\n${text}\n\nPor favor, proporciona un resumen detallado y los puntos clave del documento.`;
    return this.sendMessage(prompt);
  }
};