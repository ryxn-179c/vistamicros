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
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data || error.message,
        icon: 'error',
        confirmButtonColor: '#3498db'
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-content">
          <div className="register-illustration">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3534/3534124.png" 
              alt="Register illustration"
            />
          </div>
          
          <div className="register-form-container">
            <div className="register-logo">
              <h2>Crea tu cuenta</h2>
              <p>Completa el formulario para registrarte</p>
            </div>
            
            <form onSubmit={handleSubmit} className="register-form">
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
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Crea una contraseña segura"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="securityQuestion">Pregunta de seguridad</label>
                <div className="input-icon">
                  <FaQuestionCircle />
                </div>
                <select
                  id="securityQuestion"
                  name="securityQuestion"
                  className="security-question-select"
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
              
              <div className="input-group">
                <label htmlFor="securityAnswer">Respuesta de seguridad</label>
                <div className="input-icon">
                  <FaKey />
                </div>
                <input
                  id="securityAnswer"
                  name="securityAnswer"
                  type="text"
                  placeholder="Ingresa tu respuesta"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="register-button">
                <FaUserPlus />
                Registrarse
              </button>
              
              <div className="form-footer">
                <div className="form-links">
                  <Link to="/">¿Ya tienes cuenta? Inicia sesión</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;