import { useNavigate } from 'react-router-dom';
import { FaBook, FaPenAlt, FaSignOutAlt, FaUser, FaKey } from 'react-icons/fa';
import '../styles/Menu.css';

const Menu = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="user-info">
          <FaUser className="user-icon" />
          <h3 className="user-greeting">Hola, {username}</h3>
        </div>
      </div>
      
      <nav className="menu-nav">
        <ul>
          <li>
            <button 
              className="menu-item" 
              onClick={() => navigate('/menu/libros')}
            >
              <span className="menu-icon">
                <FaBook />
              </span>
              <span className="menu-label">Libros</span>
            </button>
          </li>
          <li>
            <button 
              className="menu-item" 
              onClick={() => navigate('/menu/autores')}
            >
              <span className="menu-icon">
                <FaPenAlt />
              </span>
              <span className="menu-label">Autores</span>
            </button>
          </li>
          {/* Nuevo apartado: Tokens de Sesión */}
          <li>
            <button 
              className="menu-item" 
              onClick={() => navigate('/menu/tokens')}
            >
              <span className="menu-icon">
                <FaKey />
              </span>
              <span className="menu-label">Tokens de Sesión</span>
            </button>
          </li>
        </ul>
        
        <div className="logout-container">
          <button 
            className="menu-item logout-item" 
            onClick={handleLogout}
          >
            <span className="menu-icon">
              <FaSignOutAlt />
            </span>
            <span className="menu-label">Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
