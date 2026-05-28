// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // A CORREÇÃO TÁ AQUI: Lazy Initial State
  // Em vez de começar com 'null', o React já nasce lendo o localStorage.
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuarioCineClube');
    // Se achar alguém salvo, transforma em objeto. Se não, aí sim começa como null.
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  // Cão de guarda: Só serve para gravar atualizações ou apagar no logout.
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuarioCineClube', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuarioCineClube');
    }
  }, [usuario]);

  function login(nomeDigitado) {
    setUsuario({ nome: nomeDigitado });
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}