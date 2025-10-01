import React, { useState } from 'react';
import SearchUser from './SearchUser';
import EditUser from './EditUser';
import { userService } from '../services/userService';

export default function Dashboard({ setView, showMessage }) {
  const [formData, setFormData] = useState({
    idUsuario: '',
    nombreUsuario: '',
    contraseniaUsuario: ''
  });
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    if (!searchId) return;
    setLoading(true);
    try {
      const data = await userService.getUserById(searchId);
      setSearchResult(data);
      setFormData({
        idUsuario: data.idUsuario.toString(),
        nombreUsuario: data.nombreUsuario,
        contraseniaUsuario: ''
      });
      showMessage('Usuario encontrado', 'success');
    } catch (error) {
      showMessage('Usuario no encontrado', 'error');
      setSearchResult(null);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await userService.updateUser(formData);
      if (response.ok) {
        showMessage('Usuario actualizado exitosamente', 'success');
      } else {
        showMessage('Error al actualizar usuario', 'error');
      }
    } catch (error) {
      showMessage('Error de conexión', 'error');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    setLoading(true);
    try {
      await userService.deleteUser(formData.idUsuario);
      showMessage('Usuario eliminado exitosamente', 'success');
      setFormData({ idUsuario: '', nombreUsuario: '', contraseniaUsuario: '' });
      setSearchResult(null);
    } catch (error) {
      showMessage('Error de conexión', 'error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setView('login');
    setFormData({ idUsuario: '', nombreUsuario: '', contraseniaUsuario: '' });
    setSearchResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Panel de Administración</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Cerrar Sesión
        </button>
      </div>

      <SearchUser
        searchId={searchId}
        setSearchId={setSearchId}
        handleSearch={handleSearch}
        loading={loading}
      />

      {searchResult && (
        <EditUser
          formData={formData}
          handleInputChange={handleInputChange}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
}
