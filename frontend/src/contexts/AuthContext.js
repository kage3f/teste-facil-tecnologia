import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000; // em segundos
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expirou
          console.warn('Token expirado');
          logout();
        } else {
          setUser({ token: storedToken, ...decoded });
        }
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false); // Finaliza o carregamento
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8888/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Decodificar o token
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // Armazenar o token no localStorage
        localStorage.setItem('token', token);

        // Atualizar o estado do usuário com o token e as informações decodificadas
        setUser({ token, ...decoded });

        return { success: true }; // Login bem-sucedido
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors ? errorData.errors[0] : 'Erro ao fazer login';

        return { success: false, error: errorMessage }; // Retornar a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
  );
};
