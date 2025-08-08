import axios from 'axios';

const API_URL = 'https://microauth.somee.com/api/Auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response;
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const resetPassword = async (resetData) => {
  return await axios.post(`${API_URL}/reset-password`, resetData);
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const username = localStorage.getItem('username'); // asegurarte que esté guardado

    if (!refreshToken || !username) {
      throw new Error('No hay refresh token o usuario disponible');
    }

    const response = await axios.post(`${API_URL}/refresh-token`, { 
      username, 
      refreshToken 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.token || !response.data.refreshToken) {
      throw new Error('Respuesta inválida del servidor');
    }

    return response.data;
  } catch (error) {
    console.error('Error al refrescar token:', error);
    throw error;
  }
};
