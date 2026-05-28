// src/routes/RotaProtegida.jsx
import { useContext } from 'react';
// Navigate redireciona, Outlet renderiza a rota filha se autorizado
import { Navigate, Outlet } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext';

function RotaProtegida() {
  // Puxamos a informação do usuário da nossa "antena" de login
  const { usuario } = useContext(AuthContext);

  // Se o usuário não existir (for null), o segurança joga ele pra página de login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Se existir, o segurança abre a porta e renderiza o que tem dentro (a rota protegida)
  return <Outlet />;
}

export default RotaProtegida;