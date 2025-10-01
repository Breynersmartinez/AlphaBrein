import React from 'react';

export default function RegisterForm({ 
  formData, 
  handleInputChange, 
  handleRegister, 
  loading 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleRegister();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Cuenta</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">ID Usuario</label>
          <input
            type="number"
            name="idUsuario"
            value={formData.idUsuario}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
          <input
            type="password"
            name="contraseniaUsuario"
            value={formData.contraseniaUsuario}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Cargando...' : 'Crear Cuenta'}
        </button>
      </div>
    </div>
  );
}