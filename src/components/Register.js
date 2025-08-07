import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaQuestionCircle, FaKey, FaUserPlus } from 'react-icons/fa';
import '../styles/Register.css';

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  // Preguntas de seguridad predefinidas
  const securityQuestions = [
    "¿Cuál es el nombre de tu primera mascota?",
    "¿Cuál es tu ciudad de nacimiento?",
    "¿Cuál es el nombre de tu escuela primaria?",
    "¿Cuál es tu comida favorita?",
    "¿Cuál es el segundo nombre de tu madre?"
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Usuario creado correctamente',
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

  return (
    <div className="login-container-alt">
      <div className="login-card-alt">
        {/* Parte izquierda con imagen */}
        <div className="login-image-section">
          <div className="image-overlay">
            <h2>Únete a nuestra comunidad</h2>
            <p>Crea una cuenta para acceder a todos los recursos</p>
          </div>
        </div>
        
        {/* Parte derecha con formulario */}
        <div className="login-form-section">
          <div className="form-header">
            <h3>Crear Cuenta</h3>
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
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group-alt">
              <label htmlFor="password">
                <FaLock className="input-icon" /> Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Crea una contraseña segura"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group-alt">
              <label htmlFor="securityQuestion">
                <FaQuestionCircle className="input-icon" /> Pregunta de seguridad
              </label>
              <select
                id="securityQuestion"
                name="securityQuestion"
                onChange={handleChange}
                required
                value={form.securityQuestion}
              >
                <option value="">Selecciona una pregunta</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>{question}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group-alt">
              <label htmlFor="securityAnswer">
                <FaKey className="input-icon" /> Respuesta de seguridad
              </label>
              <input
                id="securityAnswer"
                name="securityAnswer"
                type="text"
                placeholder="Ingresa tu respuesta"
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="login-button-alt">
              <FaUserPlus className="button-icon" />
              Registrarse
            </button>
            
            <div className="form-footer-alt">
              <div className="register-link">
                <span>¿Ya tienes cuenta? </span>
                <Link to="/">Inicia sesión</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;