import React, { useState } from 'react';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';
import SessionTokens from './SessionTokens';
import { FaUserCircle, FaBars, FaTimes, FaKey } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const username = localStorage.getItem('username') || 'Usuario';
  const [showTokens, setShowTokens] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleTokens = () => setShowTokens(prev => !prev);
  const toggleMenu = () => setIsMenuCollapsed(prev => !prev);

  return (
    <div className="dashboard-container">
      {/* Menú lateral con nuevo diseño */}
      <div className={`sidebar ${isMenuCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              <FaUserCircle className="avatar-icon" />
            </div>
            {!isMenuCollapsed && (
              <div className="user-details">
                <h3 className="username">{username}</h3>
                <span className="user-role">Administrador</span>
              </div>
            )}
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>
        
        <Menu 
          username={username} 
          onToggleTokens={toggleTokens} 
          isCollapsed={isMenuCollapsed}
        />
        
        {!isMenuCollapsed && (
          <div className="sidebar-footer">
            <button className="token-btn" onClick={toggleTokens}>
              <FaKey className="token-icon" />
              <span>Tokens de Sesión</span>
            </button>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className={`dashboard-content ${isMenuCollapsed ? 'expanded' : ''}`}>
        <div className="content-header">
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span>/</span>
            <span>Inicio</span>
          </div>
          <div className="header-actions">
            <div className="notification-badge">
              <span>3</span>
            </div>
            <div className="user-badge">
              <FaUserCircle className="avatar-icon-sm" />
              <span>{username}</span>
            </div>
          </div>
        </div>
        
        <div className="content-container">
          {showTokens ? <SessionTokens /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;