import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ContractForm = ({ initialData = {} }) => {
    const [value, setValue] = useState(initialData.value || '');
    const [date, setDate] = useState(initialData.date || '');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contractData = { value, date };

        try {
            if (id) {
                // Editar contrato existente
                await fetch(`http://localhost:8888/contracts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(contractData),
                });
            } else {
                // Criar novo contrato
                await fetch('http://localhost:8888/contracts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(contractData),
                });
            }
            navigate('/');
        } catch (error) {
            console.error('Erro ao salvar contrato:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Valor:</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{id ? 'Atualizar Contrato' : 'Criar Contrato'}</button>
        </form>
    );
};

export default ContractForm;
