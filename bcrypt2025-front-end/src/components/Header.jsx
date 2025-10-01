import React from 'react';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-indigo-600 p-4 rounded-full">
          <User className="w-12 h-12 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Sistema de Gestión de Usuarios
      </h1>
      <p className="text-gray-600">Administra usuarios de forma segura</p>
    </div>
  );
}
