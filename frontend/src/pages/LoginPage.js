import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/LoginPage.css';
import Login from '../components/Login'; // Importa o componente correto
import BgImage from '../imgs/bg-login.png';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        const success = await login(username, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="login-page">
            <div className="login-image">
                <div>
                    <img
                        src="https://static.wixstatic.com/media/2c2df7_0ca028bd4b5b479abacdee745a00433c~mv2.png/v1/fill/w_263,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20facil.png"/>
                </div>
            </div>
            <div className="login-form">
                <h1>Ola de novo</h1>
                <p>Bem vindo de volta</p>
                <Login onLogin={handleLogin} /> {/* Usa o componente importado */}
            </div>
        </div>
    );
};

export default LoginPage;
