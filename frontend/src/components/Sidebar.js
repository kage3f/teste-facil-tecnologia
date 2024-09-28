import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext); // Pega o usuário e função de logout
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal de permissão

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redireciona para a página de login após logout
    };

    const handleUsersClick = (e) => {
        if (user.role !== 'gestor') {
            e.preventDefault();
            setShowModal(true); // Exibe o modal se o usuário não for 'gestor'
        }
    };

    return (
        <div className="sidebar" style={sidebarStyle}>
            <div style={logoContainerStyle}>
                <img
                    src="https://static.wixstatic.com/media/2c2df7_0ca028bd4b5b479abacdee745a00433c~mv2.png/v1/fill/w_263,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20facil.png"
                    alt="Logo"
                    style={logoStyle}
                />
            </div>
            <Link to="/" style={linkStyle}>
                <button style={buttonStyle}>Contratos</button>
            </Link>
            <Link to="/users/manage" style={linkStyle} onClick={handleUsersClick}>
                <button style={buttonStyle}>Gerenciar Usuários</button>
            </Link>

            {/* Botão de sair no fim */}
            <div style={{ marginTop: 'auto', width: '100%' }}>
                <button onClick={handleLogout} style={buttonStyle}>Sair</button>
            </div>

            {/* Modal de permissão */}
            {showModal && (
                <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '10px' }}>Acesso Negado</h3>
                        <p>Você não tem permissão para acessar esta página.</p>
                        <button onClick={() => setShowModal(false)} style={modalButtonStyle}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos
const sidebarStyle = {
    width: '250px',
    background: 'linear-gradient(180deg, #007bff 0%, #004b99 100%)',
    padding: '20px',
    height: '100vh',
    boxShadow: '2px 0px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box'
};

const logoContainerStyle = {
    marginBottom: '30px',
};

const logoStyle = {
    width: '200px',
    height: 'auto',
};

const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
};

const linkStyle = {
    textDecoration: 'none',
    width: '100%',
};

// Estilo do modal
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
};

const modalButtonStyle = {
    marginTop: '10px',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
};

export default Sidebar;
