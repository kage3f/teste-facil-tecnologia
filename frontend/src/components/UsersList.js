import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const { user: loggedInUser } = useContext(AuthContext); // Renomeia a variável user para loggedInUser
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:8888/users', {
                headers: {
                    'Authorization': `Bearer ${loggedInUser.token}`,
                },
            });
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, [loggedInUser.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Você tem certeza que deseja excluir este usuário?')) {
            try {
                const response = await fetch(`http://localhost:8888/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                    alert('Usuário excluído com sucesso!');
                } else {
                    const errorData = await response.json();
                    alert(errorData.errors ? errorData.errors[0] : 'Erro ao excluir usuário');
                }
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                alert('Erro ao excluir usuário');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/users/edit/${id}`);
    };

    const handleCreate = () => {
        navigate('/users/create');
    };

    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Lista de Usuários</h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '60px',
                }}
            >
                <button
                    onClick={handleCreate}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                    }}
                >
                    Criar Usuário
                </button>
            </div>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '20px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <thead>
                <tr style={{ backgroundColor: '#007bff', color: 'white', height: '40px' }}>
                    <th style={{ padding: '10px', verticalAlign: 'middle' }}>ID</th>
                    <th style={{ padding: '10px', verticalAlign: 'middle' }}>Nome de Usuário</th>
                    <th style={{ padding: '10px', verticalAlign: 'middle' }}>Função</th>
                    {loggedInUser.role === 'gestor' && <th style={{ padding: '10px', verticalAlign: 'middle' }}>Ações</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} style={{ textAlign: 'center', height: '40px' }}>
                        <td style={{ verticalAlign: 'middle' }}>{user.id}</td>
                        <td style={{ verticalAlign: 'middle' }}>{user.username}</td>
                        <td style={{ verticalAlign: 'middle' }}>{user.role}</td>
                        {loggedInUser.role === 'gestor' && (
                            <td style={{ verticalAlign: 'middle' }}>
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    style={{
                                        backgroundColor: '#ffc107',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Excluir
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
