
import './App.css';
import Index from './Composants/index';
import IndexEquipe from './Composants/indexEquipe'
import Footer from './Composants/footer';
import Header from './Composants/header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Composants/login';
import NotFound from './Composants/NotFound';
// import PrivateRoute from './CustomRoutes/PrivateRoute';
import { useAuth } from './CustomRoutes/AuthContext';



function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={isLoggedIn ? <Index /> : <Navigate to="/" />} />
          <Route path="/equipe" element={isLoggedIn ? <IndexEquipe /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
