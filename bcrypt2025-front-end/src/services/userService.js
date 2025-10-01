import { API_URL } from '../config/api';



export const userService = {
  async login(idUsuario, contraseniaUsuario) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: parseInt(idUsuario),
        contraseniaUsuario
      })
    });
    return response;
  },

  async register(userData) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: parseInt(userData.idUsuario),
        nombreUsuario: userData.nombreUsuario,
        contraseniaUsuario: userData.contraseniaUsuario
      })
    });
    return response;
  },

  async getUserById(idUsuario) {
    const response = await fetch(`${API_URL}/${idUsuario}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Usuario no encontrado');
  },

  async updateUser(userData) {
    const response = await fetch(`${API_URL}/${userData.idUsuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: parseInt(userData.idUsuario),
        nombreUsuario: userData.nombreUsuario,
        contraseniaUsuario: userData.contraseniaUsuario
      })
    });
    return response;
  },

  async deleteUser(idUsuario) {
    const response = await fetch(`${API_URL}/${idUsuario}`, {
      method: 'DELETE'
    });
    return response;
  }
};
