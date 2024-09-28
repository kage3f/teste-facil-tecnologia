import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null); // Estado para armazenar erros

    // Estados para controlar o foco nas divs
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Resetar o erro antes de tentar o login
        const result = await login(username, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error); // Atualizar o estado 'error' com a mensagem de erro
        }
    };

    return (
        <form
            style={{
                maxWidth: '300px',
            }}
            onSubmit={handleSubmit}
        >
            {/* Div do Username */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    border: isUsernameFocused ? '2px solid #007bff' : '1px solid #EEEEEE', // Estilo dinâmico com base no foco
                    borderRadius: '30px',
                    padding: '18px 26px',
                    marginTop: '40px',
                    overflow: 'hidden',
                    cursor: 'pointer', // Alterar o cursor para indicar interatividade
                }}
                onClick={() => usernameInputRef.current.focus()} // Foca o input ao clicar
            >
                <span
                    style={{
                        marginRight: '8px',
                        width: '24px',
                        height: '24px',
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#C2C2C2"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    value={username}
                    ref={usernameInputRef} // Referência para o input
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    style={{
                        flex: 1,
                        padding: '4px',
                        border: 0,
                    }}
                    onFocus={() => setIsUsernameFocused(true)} // Define o foco
                    onBlur={() => setIsUsernameFocused(false)} // Remove o foco
                />
            </div>

            {/* Div do Password */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    border: isPasswordFocused ? '2px solid #007bff' : '1px solid #EEEEEE', // Estilo dinâmico com base no foco
                    borderRadius: '30px',
                    padding: '18px 26px',
                    overflow: 'hidden',
                    cursor: 'pointer', // Alterar o cursor para indicar interatividade
                }}
                onClick={() => passwordInputRef.current.focus()} // Foca o input ao clicar
            >
                <span
                    style={{
                        marginRight: '8px',
                        width: '24px',
                        height: '24px',
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#C2C2C2"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                <input
                    type="password"
                    value={password}
                    ref={passwordInputRef} // Referência para o input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{
                        flex: 1,
                        padding: '4px',
                        border: 0,
                    }}
                    onFocus={() => setIsPasswordFocused(true)} // Define o foco
                    onBlur={() => setIsPasswordFocused(false)} // Remove o foco
                />
            </div>
            {error && (
                <div
                    style={{
                        color: 'red',
                        marginBottom: '15px',
                    }}
                >
                    {error}
                </div>
            )}
            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '18px 0',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '30px',
                    cursor: 'pointer',
                }}
            >
                Login
            </button>
        </form>
    );
};

export default Login;
