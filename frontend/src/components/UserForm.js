import React, { useState } from 'react';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New user:', { username, password, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="usuario">Usuário</option>
        <option value="gestor">Gestor</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;