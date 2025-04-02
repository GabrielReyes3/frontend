import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();  // Accede al contexto de autenticación

    if (!user) {
        // Si no hay usuario (no está autenticado), redirige al login
        return <Navigate to="/login" />;
    }

    // Si está autenticado, muestra el contenido
    return children;
};

export default ProtectedRoute;
