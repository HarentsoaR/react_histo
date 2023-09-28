import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../CustomRoutes/AuthContext';

function Login() {

  const { login } = useAuth(); // Access isLoggedIn and login

  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!matricule || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const response = await axios.post('http://localhost:8088/api/v1/user/login', {
      matricule,
      password,
    });

    if (response.data.status === 'ok') {
      navigate('/home');
      // Assuming successful authentication
    login();
    } else {
      setError('Login ou mot de passe incorrect');
      navigate('/login');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };


  const handleChangeMatricule = (event) => {
    setMatricule(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <div className="TitreLogin" data-aos="zoom-in">
        VÉRIFICATION DE L'HISTORIQUE DES DÉPARTEMENTS
      </div>

      <span className="SousTitreLogin">Veuillez vous connecter</span>

      <div class="loginform" data-aos="flip-right">
        <div className="content_login">
          <form class="login">
            <div class="form-outline mb-4">
              <label class="form-label">Login</label>
              <input
                type="text"
                id="inputlogin"
                class="form-control"
                onChange={handleChangeMatricule}
                value={matricule}
              />
            </div>
            <div class="form-outline mb-4">
              <label class="form-label">Mot de passe</label>
              <input
                type="password"
                id="inputpassw"
                class="form-control"
                onChange={handleChangePassword}
                value={password}
              />
              <br />
            </div>
            <button
              type="button"
              class="btn btn-primary btn-block mb-4"
              onClick={handleLogin}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="login-icon" /> Se connecter
            </button>
          </form>
          <div id="errorLog" data-aos="flip-right">
            <center>{error !== '' && error}</center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
