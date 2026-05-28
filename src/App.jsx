// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Favoritos from './pages/Favoritos'; // Verificado: em português para não quebrar
import DetalhesFilme from './pages/DetalhesFilme';
import Header from './components/Header';
import RotaProtegida from './routes/RotaProtegida';

// Importação das três antenas (Contextos) globais do sistema
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritosProvider } from './contexts/FavoritosContext';

function App() {
  return (
    // 1. O ThemeProvider gerencia a cor do fundo (claro/escuro)
    <ThemeProvider>
      
      {/* 2. O AuthProvider gerencia a sessão e o nome do usuário logado */}
      <AuthProvider>
        
        {/* 3. O FavoritosProvider gerencia o array de filmes salvos */}
        <FavoritosProvider>
          
          {/* 4. O BrowserRouter ativa os superpoderes de navegação do React Router */}
          <BrowserRouter>
            
            {/* O Header fica fixo aqui no topo de todas as páginas */}
            <Header />
            
            <Routes>
              {/* ==========================================
                  ROTAS PÚBLICAS (Qualquer um acessa)
                 ========================================== */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/filme/:id" element={<DetalhesFilme />} />

              {/* ==========================================
                  ROTAS PROTEGIDAS (Abraçadas pelo segurança)
                 ========================================== */}
              <Route element={<RotaProtegida />}>
                {/* O Outlet do RotaProtegida decide se desenha essa linha ou não */}
                <Route path="/favoritos" element={<Favoritos />} />
              </Route>
            </Routes>

          </BrowserRouter>
          
        </FavoritosProvider>
        
      </AuthProvider>
      
    </ThemeProvider>
  );
}

export default App;