import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function EditUser({ 
  formData, 
  handleInputChange, 
  handleUpdate, 
  handleDelete, 
  loading 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUpdate();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Editar Usuario</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">ID Usuario</label>
          <input
            type="number"
            name="idUsuario"
            value={formData.idUsuario}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            disabled
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
          <label className="block text-gray-700 font-medium mb-2">Nueva Contraseña</label>
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
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <Edit className="w-5 h-5" />
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}