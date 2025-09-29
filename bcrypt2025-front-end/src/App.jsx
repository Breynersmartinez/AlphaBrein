import React, { useState } from 'react';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  const [view, setView] = useState('register'); // 'register', 'login', 'dashboard'
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleRegisterSuccess = () => {
    setView('login');
  };

  const handleLoginSuccess = (userId) => {
    setCurrentUserId(userId);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUserId(null);
    setView('login');
  };

  if (view === 'register') {
    return (
      <RegisterForm
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => setView('login')}
      />
    );
  }

  if (view === 'login') {
    return (
      <LoginForm
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => setView('register')}
      />
    );
  }

  return (
    <Dashboard
      currentUserId={currentUserId}
      onLogout={handleLogout}
    />
  );
};

export default App;