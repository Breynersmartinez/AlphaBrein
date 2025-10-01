import React from 'react';
import { Search } from 'lucide-react';

export default function SearchUser({ 
  searchId, 
  setSearchId, 
  handleSearch, 
  loading 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Buscar Usuario</h3>
      <div className="flex gap-3">
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ingresa ID del usuario"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchId}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
