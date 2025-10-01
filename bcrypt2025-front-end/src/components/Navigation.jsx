import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

export default function Navigation({ view, setView }) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="flex border-b">
        <button
          onClick={() => setView('login')}
          className={`flex-1 py-4 px-6 font-semibold transition-colors ${
            view === 'login'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-indigo-600'
          }`}
        >
          <LogIn className="inline w-5 h-5 mr-2" />
          Iniciar Sesión
        </button>
        <button
          onClick={() => setView('register')}
          className={`flex-1 py-4 px-6 font-semibold transition-colors ${
            view === 'register'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-indigo-600'
          }`}
        >
          <UserPlus className="inline w-5 h-5 mr-2" />
          Registrarse
        </button>
      </div>
    </div>
  );
}