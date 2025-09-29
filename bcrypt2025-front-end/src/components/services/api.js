const API_URL = import.meta.env.VITE_API_URL;

export const userAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: parseInt(credentials.idUsuario),
        contraseniaUsuario: credentials.contraseniaUsuario
      })
    });
    return response;
  },
  
  register: async (userData) => {
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
  
  getUser: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.ok ? await response.json() : null;
  },
  
  createUser: async (userData) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: parseInt(userData.idUsuario),
        nombreUsuario: userData.nombreUsuario,
        contraseniaUsuario: userData.contraseniaUsuario
      })
    });
  },
  
  updateUser: async (id, userData) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  },
  
  deleteUser: async (id) => {
    await fetch(`${API_URL}/${id}`, { 
      method: 'DELETE' 
    });
  }
};