// src/contexts/FavoritosContext.jsx
import { createContext, useState, useEffect } from 'react';

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  // 1. Inicia o estado já lendo do localStorage
  const [favoritos, setFavoritos] = useState(() => {
    const salvos = localStorage.getItem('filmesFavoritos');
    return salvos ? JSON.parse(salvos) : [];
  });

  // 2. Cão de guarda: Toda vez que o array de favoritos mudar, salva no HD
  useEffect(() => {
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // 3. Função para adicionar um filme novo
  function adicionarFavorito(filme) {
    // O .some verifica se o filme já existe na lista para não adicionar duplicado
    const jaExiste = favoritos.some(item => item.imdbID === filme.imdbID);
    if (!jaExiste) {
      setFavoritos([...favoritos, filme]);
    }
  }

  // 4. Função para remover um filme
  function removerFavorito(id) {
    const novaLista = favoritos.filter(filme => filme.imdbID !== id);
    setFavoritos(novaLista);
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}