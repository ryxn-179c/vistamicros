import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaCopy, FaInfoCircle, FaCheck, FaArrowLeft, FaSync } from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../styles/SessionTokens.css';
import { refreshToken as refreshTokenAPI } from '../api/authApi';

const SessionTokens = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [storedRefreshToken, setStoredRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedRefreshToken, setCopiedRefreshToken] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const copyToClipboard = (text, type) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'token') {
        setCopiedToken(true);
        setTimeout(() => setCopiedToken(false), 2000);
      } else {
        setCopiedRefreshToken(true);
        setTimeout(() => setCopiedRefreshToken(false), 2000);
      }
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await refreshTokenAPI();
      
      if (!data.token || !data.refreshToken) {
        throw new Error('Respuesta inválida del servidor');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      setToken(data.token);
      setStoredRefreshToken(data.refreshToken);
      setCopiedToken(false);
      setCopiedRefreshToken(false);
      
      await Swal.fire({
        title: '¡Éxito!',
        text: 'Tokens actualizados correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error al refrescar tokens:', error);
      
      await Swal.fire({
        title: 'Error de autenticación',
        text: 'No se pudo refrescar la sesión. Será redirigido al login.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });

      // Limpiar almacenamiento y redirigir
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      navigate('/', { replace: true });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="tokens-container">
      <div className="tokens-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Volver atrás"
        >
          <FaArrowLeft /> Volver
        </button>
        
        <h2><FaKey style={{ marginRight: '10px' }} />Tokens de Sesión</h2>
        <p>Gestiona tus tokens de autenticación</p>
      </div>

      <div className="tokens-grid">
        <div className="token-card">
          <h3><FaKey />Token de Acceso</h3>
          <div className="token-content">
            <textarea 
              readOnly 
              value={token || 'No hay token disponible'} 
              className={!token ? 'empty-token' : ''}
              aria-label="Token de acceso"
            />
          </div>
          <div className="token-actions">
            <button 
              className="copy-btn" 
              onClick={() => copyToClipboard(token, 'token')}
              disabled={!token}
              aria-label={copiedToken ? 'Token copiado' : 'Copiar token'}
            >
              {copiedToken ? <FaCheck /> : <FaCopy />}
              {copiedToken ? 'Copiado!' : 'Copiar Token'}
            </button>
          </div>
          <div className="token-info">
            <FaInfoCircle />
            <span>Este token expira después de un tiempo y debe ser renovado</span>
          </div>
        </div>

        <div className="token-card">
          <h3><FaKey />Refresh Token</h3>
          <div className="token-content">
            <textarea 
              readOnly 
              value={storedRefreshToken || 'No hay refresh token disponible'} 
              className={!storedRefreshToken ? 'empty-token' : ''}
              aria-label="Refresh token"
            />
          </div>
          <div className="token-actions">
            <button 
              className="copy-btn" 
              onClick={() => copyToClipboard(storedRefreshToken, 'refreshToken')}
              disabled={!storedRefreshToken}
              aria-label={copiedRefreshToken ? 'Refresh token copiado' : 'Copiar refresh token'}
            >
              {copiedRefreshToken ? <FaCheck /> : <FaCopy />}
              {copiedRefreshToken ? 'Copiado!' : 'Copiar Refresh Token'}
            </button>
          </div>
          <div className="token-info">
            <FaInfoCircle />
            <span>Usa este token para obtener un nuevo token de acceso cuando expire</span>
          </div>
        </div>

        <button 
          className="refresh-btn" 
          onClick={handleRefresh}
          disabled={!storedRefreshToken || isRefreshing}
        >
          {isRefreshing ? (
            <>
              <FaSync className="fa-spin" />
              Refrescando...
            </>
          ) : (
            <>
              <FaSync />
              Refrescar Tokens
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SessionTokens;
