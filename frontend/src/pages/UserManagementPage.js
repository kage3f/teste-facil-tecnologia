import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import UserForm from '../components/UserForm';

const UserManagementPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Aqui você faria uma chamada para sua API para buscar os usuários
    // Por enquanto, vamos usar dados mockados
    setUsers([
      { id: 1, username: 'usuario1', role: 'usuario' },
      { id: 2, username: 'gestor1', role: 'gestor' },
    ]);
  }, []);

  if (user.role !== 'gestor') {
    return <div>Acesso não autorizado</div>;
  }

  return (
    <div className="user-management-page">
      <h1>Gerenciamento de Usuários</h1>
      <UserForm onUserAdded={(newUser) => setUsers([...users, newUser])} />
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagementPage;