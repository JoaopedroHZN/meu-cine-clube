// src/pages/Favoritos.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritosContext } from '../contexts/FavoritosContext';

function Favoritos() {
  const { favoritos, removerFavorito } = useContext(FavoritosContext);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>⭐ Seus Filmes Favoritos</h2>

      {favoritos.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Você ainda não tem nenhum filme salvo.</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
          
          {favoritos.map(filme => (
            <div key={filme.imdbID} style={{ border: '1px solid #ff9800', padding: '10px', borderRadius: '8px', width: '200px' }}>
              <img src={filme.Poster} alt={filme.Title} style={{ width: '100%', borderRadius: '5px' }} />
              <h4 style={{ margin: '10px 0 5px' }}>{filme.Title}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to={`/filme/${filme.imdbID}`} style={{ background: '#4CAF50', color: 'white', padding: '5px', textDecoration: 'none', borderRadius: '5px' }}>
                  Detalhes
                </Link>
                <button 
                  onClick={() => removerFavorito(filme.imdbID)}
                  style={{ background: '#ff4444', color: 'white', padding: '5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  🗑️ Remover
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Favoritos;