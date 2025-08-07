import React, { useState } from 'react';
import { resetPassword } from '../api/authApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaKey, FaLock, FaRedoAlt } from 'react-icons/fa';
import '../styles/ResetPassword.css';

function ResetPassword() {
  const [form, setForm] = useState({
    username: '',
    securityAnswer: '',
    newPassword: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(form);
      Swal.fire({
        title: '¡Contraseña actualizada!',
        text: 'Tu contraseña ha sido restablecida exitosamente',
        icon: 'success',
        confirmButtonColor: '#3498db',
        timer: 2000,
        showConfirmButton: false,
        background: '#fff',
        color: '#2c3e50',
        iconColor: '#3498db',
        customClass: {
          popup: 'custom-swal-popup'
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
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

  // Función para calcular fortaleza de contraseña
  const getPasswordStrength = () => {
    if (!form.newPassword) return '';
    if (form.newPassword.length < 6) return 'Débil';
    if (form.newPassword.length < 10) return 'Moderada';
    return 'Fuerte';
  };

  return (
    <div className="login-container-alt">
      <div className="login-card-alt">
        {/* Parte izquierda con imagen */}
        <div className="login-image-section">
          <div className="image-overlay">
            <h2>Recupera tu acceso</h2>
            <p>Restablece tu contraseña para volver a ingresar</p>
          </div>
        </div>
        
        {/* Parte derecha con formulario */}
        <div className="login-form-section">
          <div className="form-header">
            <h3>Restablecer Contraseña</h3>
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
                placeholder="Ingresa tu nombre de usuario"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group-alt">
              <label htmlFor="securityAnswer">
                <FaKey className="input-icon" /> Respuesta de seguridad
              </label>
              <input
                id="securityAnswer"
                name="securityAnswer"
                type="text"
                placeholder="Ingresa tu respuesta de seguridad"
                value={form.securityAnswer}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group-alt">
              <label htmlFor="newPassword">
                <FaLock className="input-icon" /> Nueva contraseña
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Crea una nueva contraseña"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
              {form.newPassword && (
                <div className="password-strength">
                  Fortaleza: <span className={`strength-${getPasswordStrength().toLowerCase()}`}>{getPasswordStrength()}</span>
                </div>
              )}
            </div>
            
            <button type="submit" className="login-button-alt">
              <FaRedoAlt className="button-icon" />
              Restablecer contraseña
            </button>
            
            <div className="form-footer-alt">
              <div className="register-link">
                <Link to="/">Volver al inicio de sesión</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;