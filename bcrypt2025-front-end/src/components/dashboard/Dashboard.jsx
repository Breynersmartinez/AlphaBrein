import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import Header from './Header';
import UserList from './UserList';
import UserModal from './UserModal';
import Notification from '../auth/Notification';

const Dashboard = ({ currentUserId, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, [currentUserId]);

  const fetchCurrentUser = async () => {
    try {
      const userData = await userAPI.getUser(currentUserId);
      if (userData) {
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const createUser = async (userData) => {
    try {
      await userAPI.createUser(userData);
      const newUser = await userAPI.getUser(userData.idUsuario);
      
      if (newUser) {
        setUsers([...users, newUser]);
        showNotification('Usuario creado exitosamente');
      }
    } catch (err) {
      showNotification('Error al crear usuario', 'error');
    }
  };

  const updateUser = async (userData) => {
    try {
      await userAPI.updateUser(userData.idUsuario, userData);
      const updatedUser = await userAPI.getUser(userData.idUsuario);
      
      if (updatedUser) {
        setUsers(users.map(u => u.idUsuario === updatedUser.idUsuario ? updatedUser : u));
        showNotification('Usuario actualizado exitosamente');
      }
    } catch (err) {
      showNotification('Error al actualizar usuario', 'error');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      await userAPI.deleteUser(id);
      setUsers(users.filter(u => u.idUsuario !== id));
      showNotification('Usuario eliminado exitosamente');
    } catch (err) {
      showNotification('Error al eliminar usuario', 'error');
    }
  };

  const handleSaveUser = async (userData) => {
    if (selectedUser) {
      await updateUser(userData);
    } else {
      await createUser(userData);
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        userName={currentUser?.nombreUsuario || 'Usuario'}
        onLogout={onLogout}
        onNewUser={() => {
          setSelectedUser(null);
          setIsModalOpen(true);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <UserList
          users={users}
          onEdit={(user) => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          onDelete={deleteUser}
        />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default Dashboard;