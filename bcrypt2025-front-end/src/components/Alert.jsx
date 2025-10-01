import React from 'react';

export default function Alert({ message, type }) {
  if (!message) return null;

  return (
    <div className={`mb-6 p-4 rounded-lg ${
      type === 'success' 
        ? 'bg-green-100 text-green-700 border border-green-300' 
        : 'bg-red-100 text-red-700 border border-red-300'
    }`}>
      {message}
    </div>
  );
}