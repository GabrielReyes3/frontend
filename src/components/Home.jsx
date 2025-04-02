// Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';  // Asumiendo que tienes un contexto para el estado de autenticación
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();  // Asumimos que tienes un método logout en el contexto para limpiar la autenticación

  const handleLogout = () => {
    logout();  // Limpiar datos de autenticación
    navigate("/login");  // Redirigir al login
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><img src="./Perfil.png" alt="Perfil" className="logoimg" /></div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/logs">Logs</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="welcome-section">
        <h1>Bienvenido</h1>
        <p>Alumno: TSU. Reyes Vargas José Gabriel.</p>
        <p>Docente: Ing. Martínez Hernández Emmanuel.</p>
        <p>Grupo: IDGS11</p>
        <p>Materia: Seguridad en el Desarrollo de Aplicaciones.</p>
        <br />
        <p>
          Esta aplicación está realizada con la finalidad de ser el proyecto final de la materia, donde se integran todas las prácticas realizadas en clase. La aplicación contiene autenticación segura con MFA y JWT, así como un dashboard de gráficos de barras donde se muestran estadísticas acerca de los logs en una base de datos no relacional.
        </p>

        {/* Sección de imágenes con animación */}
        <div className="images-container">
          <img src="./JavaScript-logo.png" alt="Express Js" className="image" />
          <img src="./Vitejs-logo.svg.png" alt="Vite" className="image" />
          <img src="./Firebase-logo-02.png" alt="Firebase" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
