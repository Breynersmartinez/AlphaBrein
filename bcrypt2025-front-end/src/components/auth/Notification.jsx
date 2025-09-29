import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { userAPI } from '../services/api';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [credentials, setCredentials] = useState({ 
    idUsuario: '', 
    contraseniaUsuario: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await userAPI.login(credentials);

      if (response.ok) {
        onLoginSuccess(parseInt(credentials.idUsuario));
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Usuario</label>
            <input
              type="number"
              value={credentials.idUsuario}
              onChange={(e) => setCredentials({ ...credentials, idUsuario: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 12345"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={credentials.contraseniaUsuario}
              onChange={(e) => setCredentials({ ...credentials, contraseniaUsuario: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-600">¿No tienes cuenta?</p>
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 font-semibold hover:underline"
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;