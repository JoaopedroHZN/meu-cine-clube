// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
// 1. Importamos também a antena de Autenticação
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { tema, alternarTema } = useContext(ThemeContext);
  // 2. Puxamos o usuário e a função de deslogar
  const { usuario, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Função para deslogar e expulsar o cara pra tela de login
  function fazerLogout() {
    logout(); // Limpa a memória e o localStorage
    navigate('/login'); // Redireciona
  }

  return (
    <header style={{ display: 'flex', gap: '20px', padding: '15px', background: '#333', color: '#fff', alignItems: 'center' }}>
      <h3>🎬 MeuCineClube</h3>
      <nav style={{ display: 'flex', gap: '15px', alignItems: 'center', flexGrow: 1 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        
        {/* Se o usuário NÃO estiver logado, mostra o link de Login */}
        {!usuario && (
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        )}
        
        <Link to="/favoritos" style={{ color: '#fff', textDecoration: 'none' }}>Favoritos</Link>
      </nav>

      {/* Se o usuário ESTIVER logado, mostra o nome dele e o botão de Sair */}
      {usuario && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Olá, {usuario.nome}</span>
          <button onClick={fazerLogout} style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '5px', background: '#ff4444', color: 'white', border: 'none' }}>
            Sair
          </button>
        </div>
      )}
      
      <button onClick={alternarTema} style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '5px', marginLeft: '10px' }}>
        {tema === 'claro' ? '🌙 Escuro' : '☀️ Claro'}
      </button>
    </header>
  );
}

export default Header;