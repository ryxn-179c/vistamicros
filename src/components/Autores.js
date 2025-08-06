import React, { useEffect, useState } from 'react';
import { getAutores, createAutor } from '../api/autorApi';
import { FaUser, FaUserPlus, FaCalendarAlt, FaSpinner, FaSearch } from 'react-icons/fa';
import '../styles/Autores.css';

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAutor, setNewAutor] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        setLoading(true);
        const { data } = await getAutores();
        setAutores(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener autores:', error);
        setError('Error al cargar los autores. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAutores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAutor({
      ...newAutor,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);

      const autorToCreate = {
        nombre: newAutor.nombre.trim(),
        apellido: newAutor.apellido.trim(),
        fechaNacimiento: newAutor.fechaNacimiento
      };

      await createAutor(autorToCreate);

      setNewAutor({
        nombre: '',
        apellido: '',
        fechaNacimiento: ''
      });

      const { data } = await getAutores();
      setAutores(data);
      setError(null);
    } catch (error) {
      console.error('Error al crear autor:', error);
      setError(error.response?.data?.message || 'Error al crear el autor. Verifica los datos.');
    } finally {
      setIsCreating(false);
    }
  };

  const getInitials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const autoresFiltrados = autores.filter(autor =>
    `${autor.nombre} ${autor.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="autores-container">
        <div className="empty-state">
          <FaSpinner className="fa-spin" size={24} />
          <p>Cargando autores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="autores-container">
      <div className="content-header">
        <div className="breadcrumb">
          <span>Dashboard</span>
          <span>/</span>
          <span>Autores</span>
        </div>
        <div className="header-actions">
          <div className="autores-count">{autores.length} {autores.length === 1 ? 'autor' : 'autores'}</div>
        </div>
      </div>

      <div className="content-container">
        <div className="section-header">
          <h2>Directorio de Autores</h2>
          <div className="autores-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="create-autor-form">
          <h3><FaUserPlus style={{ marginRight: '10px' }} />Agregar Nuevo Autor</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nombre"><FaUser style={{ marginRight: '6px' }} />Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={newAutor.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre del autor"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido"><FaUser style={{ marginRight: '6px' }} />Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  value={newAutor.apellido}
                  onChange={handleInputChange}
                  placeholder="Apellido del autor"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fechaNacimiento"><FaCalendarAlt style={{ marginRight: '6px' }} />Fecha de Nacimiento</label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  name="fechaNacimiento"
                  value={newAutor.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <FaSpinner className="fa-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Crear Autor
                </>
              )}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        {autoresFiltrados.length === 0 ? (
          <div className="empty-state">
            <FaUser size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h3>No se encontraron autores</h3>
            <p>Intenta con otro término de búsqueda</p>
          </div>
        ) : (
          <div className="autor-grid">
            {autoresFiltrados.map((autor) => (
              <div key={autor.autorLibroGuid} className="autor-card">
                <div className="autor-initials">
                  {getInitials(autor.nombre, autor.apellido)}
                </div>
                <h3>{autor.nombre} {autor.apellido}</h3>
                <p className="autor-meta">
                  <FaCalendarAlt className="meta-icon" />
                  Nacido el: {new Date(autor.fechaNacimiento).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Autores;