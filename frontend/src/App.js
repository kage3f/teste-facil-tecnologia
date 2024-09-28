import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContractsList from './components/ContractsList';
import CreateContract from './components/CreateContract';
import EditContract from './components/EditContract';
import UserForm from './components/UserForm';
import UsersList from "./components/UsersList";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Rota protegida que sempre exibe o Sidebar e o layout de Dashboard */}
            <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>}>
              <Route path="/" element={<ContractsList />} />
              <Route path="/contracts/create" element={<CreateContract />} />
              <Route path="/contracts/edit/:id" element={<EditContract />} />

              <Route path="/users/manage" element={<PrivateRoute><UsersList /></PrivateRoute>} />
              <Route path="/users/create" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
              <Route path="/users/edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

// Rota privada, redireciona para login se não autenticado
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Pode ser um spinner de carregamento
  }

  return user ? children : <Navigate to="/login" />;
};

export default App;
