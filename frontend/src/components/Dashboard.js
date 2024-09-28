import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Bem-vindo, {user.username}</h1>
        </div>
    );
};

export default Dashboard;
