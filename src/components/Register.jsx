import React, { useState } from "react";
import api from "../services/api";
import { Link } from 'react-router-dom';
import './Register.css'; // Importa los estilos
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [grado, setGrado] = useState("");
    const [grupo, setGrupo] = useState("");
    const [qrCode, setQrCode] = useState(null);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/register", {
                email,
                username,
                password,
                grado,
                grupo,
            });

            setQrCode(response.data.qrCode);
            setError("");
            setShowModal(true);
        } catch (err) {
            setError(err.response?.data?.msg || "Error en el registro");
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Registro</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                    />

                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="eye-icon"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="Grado"
                        value={grado}
                        onChange={(e) => setGrado(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Grupo"
                        value={grupo}
                        onChange={(e) => setGrupo(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">Registrar</button>
                </form>

                <div className="login-link">
                    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                </div>
                {qrCode && showModal && (
                    <div className="modal show">
                        <div className="modal-content">
                            <h3>Escanea el siguiente código QR para MFA:</h3>
                            <img src={qrCode} alt="QR Code" className="qr-image" />
                            <p className="qr-text">Escanea el código QR con un autenticador</p>
                            <Link to="/login">
                                <button className="submit-button">
                                    Iniciar sesión
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
