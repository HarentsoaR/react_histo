import React from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../CustomRoutes/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    // Call the logout function to set isLoggedIn to false
    logout();
    navigate('/login');
  };

  const handleEquipe = () => {
    navigate('/equipe')
  }

  const handleDepartment = () => {
    navigate('/home')
  }
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-brand">HISTORIQUE</div>
          <ul className="navbar-nav ml-auto">
            {location.pathname !== '/login' && (
              <>
                <li className="nav-item">
                  <button type="button" className="nav-link" onClick={handleDepartment}>Department</button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link" onClick={handleEquipe}>Equipe</button>
                </li>
              </>
            )}
            <li className="nav-item">
              <button type="button" className="btn btn-primary" id="connexion" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;