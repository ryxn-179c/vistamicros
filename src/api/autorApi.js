import axios from 'axios';

const API_URL = 'https://microautores.somee.com/api/Autor';

export const getAutores = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const createAutor = async (autorData) => {
  const token = localStorage.getItem('token');
  
  const payload = {
    nombre: autorData.nombre,
    apellido: autorData.apellido,
    fechaNacimiento: formatDateForBackend(autorData.fechaNacimiento)
  };

  return await axios.post(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const formatDateForBackend = (dateString) => {
  if (!dateString) return null;
  
  const localDate = new Date(dateString);
  
  const utcDate = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      0, 0, 0, 0
    )
  );
  
  return utcDate.toISOString();
};