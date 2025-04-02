import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 
import "./Logs.css";

const Logs = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [logsData, setLogsData] = useState([]);
    const [selectedServer, setSelectedServer] = useState("servidor1");

    useEffect(() => {
        // URL para el servidor 1 y servidor 2
        const serverUrl = selectedServer === "servidor1" 
            ? 'https://server1-rate-limit-xrz4.onrender.com/api/auth/logs' 
            : 'https://server2-no-rate-limit.onrender.com/api/auth/logs';  // Cambiar la URL de la API del servidor 2 si es necesario

        api.get(serverUrl)
            .then(response => setLogsData(response.data))
            .catch(error => console.error(error));
    }, [selectedServer]);

    const httpMethodsData = [
        { name: 'GET', count: logsData.filter(log => log.method === "GET").length },
        { name: 'POST', count: logsData.filter(log => log.method === "POST").length },
        { name: 'OPTIONS', count: logsData.filter(log => log.method === "OPTIONS").length }
    ];

    const logLevelsData = [
        { name: 'Info', count: logsData.filter(log => log.logLevel === "info").length },
        { name: 'Error', count: logsData.filter(log => log.logLevel === "error").length }
    ];

    const statusResponsesData = [
        { name: '200', count: logsData.filter(log => log.status === 200).length },
        { name: '204', count: logsData.filter(log => log.status === 204).length },
        { name: 'Failed', count: logsData.filter(log => log.status !== 200 && log.status !== 204).length }
    ];

    // Cambiar de servidor y redirigir a la página de logs
    const handleServerChange = (e) => {
        setSelectedServer(e.target.value);
        navigate("/logs");  // Redirigir a /logs
    };

    return (
        <div className="logs-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo"><img src="./Perfil.png" alt="Perfil" className="logoimg" /></div>
                <ul className="nav-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/logs">Logs</Link></li>
                    <li><button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button></li>
                </ul>
            </nav>

            <h2>Gráficas acerca de los Logs de Servidores</h2>

            {/* Dropdown para seleccionar el servidor */}
            <div className="server-select">
                <label htmlFor="server-select">Seleccionar Servidor: </label>
                <select
                    id="server-select"
                    value={selectedServer}
                    onChange={handleServerChange}  // Usar la nueva función
                >
                    <option value="servidor1">Servidor 1 - Rate Limit</option>
                    <option value="servidor2">Servidor 2 - Sin Rate Limit</option>
                </select>
            </div>

            <div className="graph-container">
                <h3>Métodos HTTP Utilizados</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={httpMethodsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} 
                            wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
                            cursor={{ fill: 'rgba(0, 0, 0, 0.3)' }} />
                        <Legend />
                        <Bar dataKey="count" fill="rgba(75, 192, 192, 0.5)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="graph-container">
                <h3>Niveles de Log</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={logLevelsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} 
                            wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
                            cursor={{ fill: 'rgba(0, 0, 0, 0.3)' }} />
                        <Legend />
                        <Bar dataKey="count" fill="rgba(255, 99, 132, 0.5)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="graph-container">
                <h3>Respuestas por Status</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={statusResponsesData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff' }} 
                            wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
                            cursor={{ fill: 'rgba(0, 0, 0, 0.3)' }} />
                        <Legend />
                        <Bar dataKey="count" fill="rgba(153, 102, 255, 0.5)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Logs;
