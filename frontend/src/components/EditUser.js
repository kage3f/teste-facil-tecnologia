import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams(); // Pegando o ID do usuário pela URL
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('usuario');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Buscar os dados do usuário para preencher o formulário
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8888/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const user = await response.json();
                    setUsername(user.username);
                    setRole(user.role);
                } else {
                    const errorData = await response.json();
                    setError(errorData.errors ? errorData.errors[0] : 'Erro ao buscar usuário');
                }
            } catch (error) {
                setError('Erro ao buscar usuário');
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`http://localhost:8888/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ username, password, role }),
            });

            if (response.ok) {
                navigate('/users/manage'); // Redireciona para a lista de usuários após a edição
            } else {
                const errorData = await response.json();
                setError(errorData.errors ? errorData.errors[0] : 'Erro ao atualizar usuário');
            }
        } catch (error) {
            setError('Erro ao atualizar usuário');
        }
    };

    return (
        <div
            style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                width: '100%',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                Editar Usuário
            </h2>
            {error && (
                <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
                    >
                        Nome de Usuário:
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
                    >
                        Senha:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
                    >
                        Função:
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <option value="usuario">Usuário</option>
                        <option value="gestor">Gestor</option>
                    </select>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '10px',
                        width: '100%',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
};

export default EditUser;
