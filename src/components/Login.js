import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import '../styles/Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', form.username);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // Nueva animación de login exitoso con diseño actualizado
      Swal.fire({
        title: '¡Acceso concedido!',
        text: 'Redirigiendo a tu cuenta...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#fff',
        color: '#2c3e50',
        iconColor: '#3498db',
        customClass: {
          popup: 'custom-swal-popup'
        }
      }).then(() => {
        navigate('/menu');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error de acceso',
        text: error.response?.data || error.message,
        icon: 'error',
        confirmButtonColor: '#3498db',
        background: '#fff',
        color: '#2c3e50',
        iconColor: '#e74c3c',
        customClass: {
          popup: 'custom-swal-popup'
        }
      });
    }
  };

  return (
    <div className="login-container-alt">
      <div className="login-card-alt">
        {/* Parte izquierda con imagen */}
        <div className="login-image-section">
          <div className="image-overlay">
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa tus credenciales para acceder a tu cuenta</p>
          </div>
        </div>
        
        {/* Parte derecha con formulario - Icono de usuario eliminado */}
        <div className="login-form-section">
          <div className="form-header">
            <h3>Iniciar Sesión</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form-alt">
            <div className="input-group-alt">
              <label htmlFor="username">
                <FaUser className="input-icon" /> Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Ingresa tu usuario"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group-alt">
              <label htmlFor="password">
                <FaLock className="input-icon" /> Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  onChange={handleChange}
                  required
                />
                <div 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            
            <button type="submit" className="login-button-alt">
              <FaSignInAlt className="button-icon" />
              Acceder
            </button>
            
            <div className="form-footer-alt">
              <Link to="/reset" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
              
              <div className="divider">
                <span>o</span>
              </div>
              
              <div className="register-link">
                <span>¿No tienes cuenta? </span>
                <Link to="/register">Regístrate</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;