import React, { useState } from 'react';
import Header from './components/Header';
import Alert from './components/Alert';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ChatBot from './bot/ChatBot'; // Cambiado de Dashboard a ChatBot
import { userService } from './services/userService';

export default function App() {
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({
    idUsuario: '',
    nombreUsuario: '',
    contraseniaUsuario: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await userService.login(
        formData.idUsuario,
        formData.contraseniaUsuario
      );

      if (response.ok) {
        showMessage('Login exitoso', 'success');
        setView('dashboard');
      } else {
        showMessage('Credenciales incorrectas', 'error');
      }
    } catch (error) {
      showMessage('Error de conexión', 'error');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await userService.register(formData);

      if (response.ok) {
        showMessage('Usuario creado exitosamente', 'success');
        setFormData({ idUsuario: '', nombreUsuario: '', contraseniaUsuario: '' });
      } else {
        showMessage('Error al crear usuario', 'error');
      }
    } catch (error) {
      showMessage('Error de conexión', 'error');
    }
    setLoading(false);
  };

  // Si está en dashboard, mostrar ChatBot en pantalla completa
  if (view === 'dashboard') {
    return <ChatBot setView={setView} />;
  }

  // Login y Register con el diseño actual
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <Header />
        
        <Alert message={message.text} type={message.type} />

        <Navigation view={view} setView={setView} />

        {view === 'login' && (
          <LoginForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
            loading={loading}
          />
        )}

        {view === 'register' && (
          <RegisterForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleRegister={handleRegister}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

