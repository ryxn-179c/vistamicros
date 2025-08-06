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
        confirmButtonColor: '#e74c3c',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data || error.message,
        icon: 'error',
        confirmButtonColor: '#e74c3c'
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
    <div className="reset-container">
      <div className="reset-wrapper">
        <div className="reset-content">
          <div className="reset-illustration">
            <img 
              src="https://images.vexels.com/media/users/3/128639/isolated/preview/62da532313d78f789be64c06811f39f0-restablecer-icon-svg.png" 
              alt="Reset password illustration"
            />
          </div>
          
          <div className="reset-form-container">
            <div className="reset-logo">
              <h2>Restablecer contraseña</h2>
              <p>Ingresa tus datos para recuperar el acceso</p>
            </div>
            
            <form onSubmit={handleSubmit} className="reset-form">
              <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <div className="input-icon">
                  <FaUser />
                </div>
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
              
              <div className="input-group">
                <label htmlFor="securityAnswer">Respuesta de seguridad</label>
                <div className="input-icon">
                  <FaKey />
                </div>
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
              
              <div className="input-group">
                <label htmlFor="newPassword">Nueva contraseña</label>
                <div className="input-icon">
                  <FaLock />
                </div>
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
                    Fortaleza: {getPasswordStrength()}
                  </div>
                )}
              </div>
              
              <button type="submit" className="reset-button">
                <FaRedoAlt />
                Restablecer contraseña
              </button>
              
              <div className="form-footer">
                <div className="form-links">
                  <Link to="/">Volver al inicio de sesión</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;