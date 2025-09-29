import React from 'react';
import { Plus, LogOut } from 'lucide-react';

const Header = ({ userName, onLogout, onNewUser }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
            <p className="text-sm text-gray-600 mt-1">Bienvenido, {userName}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onNewUser}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Nuevo Usuario
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;