import React from 'react';
import { User, Edit2, Trash2 } from 'lucide-react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{user.nombreUsuario}</h3>
            <p className="text-sm text-gray-500">ID: {user.idUsuario}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Editar usuario"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(user.idUsuario)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Eliminar usuario"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;