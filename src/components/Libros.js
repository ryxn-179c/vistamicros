import React, { useEffect, useState } from 'react';
import { getLibros, createLibro } from '../api/libroApi';
import { getAutores } from '../api/autorApi';
import { FaBook, FaCalendarAlt, FaUserEdit, FaPlus, FaSpinner, FaSearch } from 'react-icons/fa';
import '../styles/Libros.css';

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLibro, setNewLibro] = useState({
    titulo: '',
    fechaPublicacion: '',
    autorLibro: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [librosRes, autoresRes] = await Promise.all([
          getLibros(),
          getAutores()
        ]);
        setLibros(librosRes.data);
        setAutores(autoresRes.data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('Error al cargar los datos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLibro({
      ...newLibro,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await createLibro(newLibro);
      
      setNewLibro({
        titulo: '',
        fechaPublicacion: '',
        autorLibro: ''
      });

      const { data } = await getLibros();
      setLibros(data);
      setError(null);
    } catch (error) {
      console.error('Error al crear libro:', error);
      setError(error.response?.data?.message || 'Error al crear el libro. Verifica los datos.');
    } finally {
      setIsCreating(false);
    }
  };

  const librosFiltrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="libros-container">
        <div className="empty-state">
          <FaSpinner className="fa-spin" size={24} />
          <p>Cargando libros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="libros-container">
      <div className="content-header">
        <div className="breadcrumb">
          <span>Dashboard</span>
          <span>/</span>
          <span>Libros</span>
        </div>
        <div className="header-actions">
          <div className="libros-count">{libros.length} {libros.length === 1 ? 'libro' : 'libros'}</div>
        </div>
      </div>

      <div className="content-container">
        <div className="section-header">
          <h2>Biblioteca de Libros</h2>
          <div className="libros-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="create-libro-form">
          <h3><FaPlus style={{ marginRight: '10px' }} />Agregar Nuevo Libro</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="titulo"><FaBook style={{ marginRight: '6px' }} />Título</label>
                <input
                  id="titulo"
                  type="text"
                  name="titulo"
                  value={newLibro.titulo}
                  onChange={handleInputChange}
                  placeholder="Título del libro"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fechaPublicacion"><FaCalendarAlt style={{ marginRight: '6px' }} />Fecha de Publicación</label>
                <input
                  id="fechaPublicacion"
                  type="date"
                  name="fechaPublicacion"
                  value={newLibro.fechaPublicacion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="autorLibro"><FaUserEdit style={{ marginRight: '6px' }} />Autor</label>
                <select
                  id="autorLibro"
                  name="autorLibro"
                  value={newLibro.autorLibro}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un autor</option>
                  {autores.map(autor => (
                    <option key={autor.autorLibroGuid} value={autor.autorLibroGuid}>
                      {autor.nombre} {autor.apellido}
                    </option>
                  ))}
                </select>
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
                  <FaPlus />
                  Crear Libro
                </>
              )}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        {librosFiltrados.length === 0 ? (
          <div className="empty-state">
            <FaBook size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h3>No hay libros registrados</h3>
            <p>Comienza agregando tu primer libro usando el formulario</p>
          </div>
        ) : (
          <div className="libro-grid">
            {librosFiltrados.map((libro) => {
              const autor = autores.find(a => a.autorLibroGuid === libro.autorLibro);
              return (
                <div key={libro.libroGuid} className="libro-card">
                  <div className="libro-header">
                    <FaBook className="libro-icon" />
                    <h3>{libro.titulo}</h3>
                  </div>
                  <p className="libro-meta">
                    <FaCalendarAlt className="meta-icon" />
                    Publicado el: {new Date(libro.fechaPublicacion).toLocaleDateString()}
                  </p>
                  <div className="libro-autor">
                    <FaUserEdit className="autor-icon" />
                    <span>{autor ? `${autor.nombre} ${autor.apellido}` : 'Autor desconocido'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Libros;