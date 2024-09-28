import React from 'react';
import { Outlet } from 'react-router-dom';  // Usado para renderizar as rotas aninhadas
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ paddingLeft: '40px', padding: '20px', width: '100%' }}>
                <Outlet /> {/* Renderiza as rotas aninhadas aqui */}
            </div>
        </div>
    );
};

export default DashboardPage;
