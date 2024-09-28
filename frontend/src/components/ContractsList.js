import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ContractsList = () => {
    const { user } = useContext(AuthContext);
    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulação de requisição para obter os contratos (você faria uma chamada real aqui)
        const fetchContracts = async () => {
            const response = await fetch('http://localhost:8888/contracts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            setContracts(data);
        };

        fetchContracts();
    }, [user.token]);

    const handleDelete = async (id) => {
        // Confirmar a exclusão com o usuário
        if (window.confirm('Você tem certeza que deseja excluir este contrato?')) {
            try {
                const response = await fetch(`http://localhost:8888/contracts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setContracts(prevContracts => prevContracts.filter(contract => contract.id !== id));
                    // Lógica para remover o contrato da lista, se necessário
                    alert('Contrato excluído com sucesso!');
                } else {
                    const errorData = await response.json();
                    alert(errorData.errors ? errorData.errors[0] : 'Erro ao excluir contrato');
                }
            } catch (error) {
                console.error('Erro ao excluir contrato:', error);
                alert('Erro ao excluir contrato');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/contracts/edit/${id}`);
    };

    const handleCreate = () => {
        navigate('/contracts/create');
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };


    return (
        <div>
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
            }}>
                Lista de Contratos
            </h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '60px'
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
                    Criar Contrato
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
                <tr style={{backgroundColor: '#007bff', color: 'white', height: '40px'}}>
                <th style={{ padding: '10px', verticalAlign: 'middle' }}>ID</th>
                    <th style={{ padding: '10px', verticalAlign: 'middle' }}>Valor</th>
                    <th style={{ padding: '10px', verticalAlign: 'middle' }}>Data</th>
                    {user.role === 'gestor'
                        && <th style={{ padding: '10px', verticalAlign: 'middle' }}>Ações</th>}
                </tr>
                </thead>
                <tbody>
                {contracts.map((contract) => (
                    <tr key={contract.id} style={{ textAlign: 'center', height: '40px' }}>
                        <td style={{ verticalAlign: 'middle' }}>{contract.id}</td>
                        <td style={{ verticalAlign: 'middle' }}>{formatCurrency(contract.value)}</td>
                        <td style={{ verticalAlign: 'middle' }}>{formatDate(contract.date)}</td>
                        {user.role === 'gestor' && (
                            <td style={{ verticalAlign: 'middle' }}>
                                <button
                                    onClick={() => handleEdit(contract.id)}
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
                                    onClick={() => handleDelete(contract.id)}
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

export default ContractsList;
