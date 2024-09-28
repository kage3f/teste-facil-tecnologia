import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditContract = () => {
    const { id } = useParams();
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await fetch(`http://localhost:8888/contracts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setContract(data);
            } catch (error) {
                console.error('Erro ao buscar contrato:', error);
                setError('Erro ao buscar contrato');
            }
        };

        fetchContract();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8888/contracts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(contract),
            });

            if (response.ok) {
                navigate('/'); // Redirecionar após edição
            } else {
                const errorData = await response.json();
                setError(errorData.errors ? errorData.errors[0] : 'Erro ao editar contrato');
            }
        } catch (error) {
            setError('Erro ao editar contrato');
        }
    };

    if (!contract) {
        return <div>Carregando...</div>;
    }

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
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Editar Contrato</h2>
            {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
                    >
                        Valor:
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={contract.value}
                        onChange={(e) => setContract({ ...contract, value: e.target.value })}
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
                        Data:
                    </label>
                    <input
                        type="date"
                        value={contract.date}
                        onChange={(e) => setContract({ ...contract, date: e.target.value })}
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

export default EditContract;
