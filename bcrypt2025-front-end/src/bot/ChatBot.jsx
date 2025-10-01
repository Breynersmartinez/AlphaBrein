import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Paperclip, Loader2, LogOut, User as UserIcon } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export default function ChatBot({ setView }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! Soy tu asistente virtual. Puedo ayudarte a analizar documentos PDF y DOCX, o responder cualquier pregunta que tengas. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractTextFromPDF = async (file) => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  };

  const extractTextFromDOCX = async (file) => {
    const mammoth = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!['pdf', 'docx', 'doc'].includes(fileExtension)) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Lo siento, solo puedo analizar archivos PDF y DOCX. Por favor, sube un archivo con uno de estos formatos.' 
      }]);
      return;
    }

    setMessages(prev => [...prev, { 
      role: 'user', 
      text: `📎 Archivo adjunto: ${file.name}` 
    }]);

    try {
      setLoading(true);
      let extractedText = '';

      if (fileExtension === 'pdf') {
        extractedText = await extractTextFromPDF(file);
      } else {
        extractedText = await extractTextFromDOCX(file);
      }

      const response = await geminiService.analyzeDocument(extractedText, file.name);
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: response 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Lo siento, hubo un error al analizar el documento. Por favor, verifica que el archivo no esté corrupto e intenta de nuevo.' 
      }]);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    try {
      setLoading(true);
      const response = await geminiService.sendMessage(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    setView('login');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Asistente Virtual BreinLogic</h1>
              <p className="text-sm text-gray-600">Analiza documentos y responde tus preguntas</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col py-6 px-4">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-white rounded-lg shadow-md p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}>
                    {message.role === 'user' ? (
                      <UserIcon className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 p-4 rounded-lg rounded-bl-none">
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 border border-gray-300"
                title="Adjuntar documento PDF o DOCX"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje o adjunta un documento..."
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputText.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="font-medium">Enviar</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Puedes adjuntar archivos PDF o DOCX para que los analice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}