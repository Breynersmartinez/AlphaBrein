import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import ClientSignUp from './components/ClientSignUp';
import Dashboard from './components/Dashboard';

const App = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Mientras carga la autenticación
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostrar Dashboard
  if (isAuthenticated) {
    return <Dashboard navigateTo={navigateTo} />;
  }

  // Si no está autenticado, mostrar Login o SignUp
  switch (currentPage) {
    case 'login':
      return <Login navigateTo={navigateTo} />;
    case 'clientSignUp':
      return <ClientSignUp navigateTo={navigateTo} />;
    default:
      return <Login navigateTo={navigateTo} />;
  }
};

export default App;