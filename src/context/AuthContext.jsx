// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Revisar si hay un token al cargar la aplicación
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            // Si existe un token, puedes usarlo para cargar la info del usuario
            setUser({ token: storedToken }); // Aquí puedes agregar más datos si los tienes
        }
    }, []);

    // Función para realizar login
    const login = (userData) => {
        setUser(userData); // Guardar la info del usuario
        localStorage.setItem('authToken', userData.token); // Guardamos el token
    };

    // Función para realizar logout
    const logout = () => {
        setUser(null); // Limpiamos el estado del usuario
        localStorage.removeItem('authToken'); // Removemos el token de localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
