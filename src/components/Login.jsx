import React, { useState } from 'react';
import api from "../services/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importamos los iconos

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(""); // Token MFA
    const [error, setError] = useState("");
    const [useMFA, setUseMFA] = useState(false); // Estado para saber si se usará MFA
    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para manejar la visibilidad de la contraseña
    const [tokenVisible, setTokenVisible] = useState(false); // Estado para manejar la visibilidad del token MFA
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password: !useMFA ? password : undefined,  // Solo enviar contraseña si no se usa MFA
                token: useMFA ? token : undefined,  // Solo enviar token si se usa MFA
                useMFA,  // Indicar si se usará MFA
            };

            const response = await api.post("/login", loginData);

            // Guardar el token JWT y la información del usuario en el contexto
            login({ token: response.data.token });

            setError(""); // Reset error if login is successful
            navigate("/home"); // Redirigir al usuario al Home
        } catch (err) {
            setError(err.response?.data?.msg || "Error en el login");
            console.error("Error de login:", err);
        }
    };

    return (
        <div className="login-page"> {/* Clase envolvente específica */}
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                
                {/* Condicionalmente renderizar el campo de contraseña si MFA no está activado */}
                {!useMFA && (
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"} // Cambiar entre texto o contraseña
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={!useMFA} // Si no usa MFA, la contraseña es obligatoria
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="eye-icon"
                            onClick={() => setPasswordVisible(!passwordVisible)} // Alternar visibilidad
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                )}

                <div className="mfa-switch">
                <label>
                    <input
                    type="checkbox"
                    checked={useMFA}
                    onChange={(e) => setUseMFA(e.target.checked)} // Toggle MFA
                    style={{ marginRight: '10px' }} // Espacio entre el checkbox y el texto
                    />
                    Iniciar sesión con MFA
                </label>
                </div>


                {/* Si se usa MFA, mostrar el campo de código MFA */}
                {useMFA && (
                    <div className="password-container">
                        <input
                            type={tokenVisible ? "text" : "password"} // Cambiar entre texto o token
                            placeholder="Código MFA"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="eye-icon"
                            onClick={() => setTokenVisible(!tokenVisible)} // Alternar visibilidad
                        >
                            {tokenVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                )}

                <button type="submit" className="submit-button">Iniciar sesión</button>
            </form>
            <div className="register-link">
                <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
            </div>
        </div>
        </div>
    );
};

export default Login;
