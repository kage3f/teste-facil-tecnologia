import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateContract = () => {
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:8888/contracts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ value, date }),
            });

            if (response.ok) {
                navigate('/'); // Redireciona para a lista de contratos
            } else {
                const errorData = await response.json();
                setError(errorData.errors ? errorData.errors[0] : 'Erro ao criar contrato');
            }
        } catch (error) {
            console.error('Erro ao criar contrato:', error);
            setError('Erro ao criar contrato');
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
                Criar Novo Contrato
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
                        Valor:
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                    Criar Contrato
                </button>
            </form>
        </div>
    );
};

export default CreateContract;
