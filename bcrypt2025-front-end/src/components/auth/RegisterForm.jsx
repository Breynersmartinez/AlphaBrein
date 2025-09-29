import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { userAPI } from '../services/api';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    idUsuario: '',
    nombreUsuario: '',
    contraseniaUsuario: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');

    if (!formData.idUsuario || !formData.nombreUsuario || !formData.contraseniaUsuario) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (formData.contraseniaUsuario !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await userAPI.register(formData);

      if (response.ok) {
        onRegisterSuccess();
      } else {
        setError('Error al registrar usuario. El ID puede estar en uso.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-100 p-4 rounded-full">
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Crear Cuenta</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Usuario *</label>
            <input
              type="number"
              value={formData.idUsuario}
              onChange={(e) => setFormData({ ...formData, idUsuario: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ej: 12345"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
            <input
              type="text"
              value={formData.nombreUsuario}
              onChange={(e) => setFormData({ ...formData, nombreUsuario: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Juan Pérez"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña *</label>
            <input
              type="password"
              value={formData.contraseniaUsuario}
              onChange={(e) => setFormData({ ...formData, contraseniaUsuario: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña *</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-600">¿Ya tienes cuenta?</p>
            <button
              onClick={onSwitchToLogin}
              className="text-purple-600 font-semibold hover:underline"
            >
              Inicia sesión aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;