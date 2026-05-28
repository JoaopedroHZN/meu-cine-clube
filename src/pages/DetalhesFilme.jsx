// src/pages/DetalhesFilme.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FavoritosContext } from '../contexts/FavoritosContext';

function DetalhesFilme() {
  const { id } = useParams();
  
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  
  // NOVOS ESTADOS PARA O POLIMENTO
  const [erro, setErro] = useState(false); // Para tratar falhas de internet
  const [mensagem, setMensagem] = useState(''); // Para a mensagem de sucesso

  const { adicionarFavorito } = useContext(FavoritosContext);

  useEffect(() => {
    async function buscarDetalhes() {
      try {
        const resposta = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=trilogy`);
        
        // Se a internet falhar ou a API der erro 404/500, a gente "joga" o erro pro Catch
        if (!resposta.ok) {
          throw new Error("Erro de conexão");
        }
        
        const dados = await resposta.json();
        
        // A OMDb retorna 'Response: "False"' se o ID for inválido
        if (dados.Response === "False") {
          setErro(true);
        } else {
          setFilme(dados);
        }
      } catch (erro) {
        console.error("Falha ao buscar detalhes:", erro);
        setErro(true); // Ativa a tela de erro
      } finally {
        setCarregando(false);
      }
    }

    buscarDetalhes();
  }, [id]);

  // Função nova que agrupa salvar o filme e mostrar o aviso na tela
  function lidarComFavorito() {
    adicionarFavorito(filme);
    setMensagem("Filme adicionado com sucesso! 🍿");
    
    // O setTimeout funciona como um temporizador. Depois de 3000 milissegundos, apaga a mensagem.
    setTimeout(() => {
      setMensagem('');
    }, 3000);
  }

  // Telas de carregamento e erro (Feedback visual)
  if (carregando) return <h3 style={{ padding: '20px', textAlign: 'center' }}>Buscando rolo de filme... 🎞️</h3>;
  if (erro || !filme) return <h3 style={{ padding: '20px', textAlign: 'center', color: '#ff4444' }}>Ocorreu um erro ao carregar o filme ou você está sem internet. 📡</h3>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>{filme.Title} ({filme.Year})</h2>
      
      <img 
        src={filme.Poster} 
        alt={filme.Title} 
        style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginTop: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} 
      />
      
      <div style={{ marginTop: '20px', background: '#222', color: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'left', lineHeight: '1.5' }}>
        <p style={{ marginBottom: '10px' }}><strong>Sinopse:</strong> {filme.Plot}</p>
        <p style={{ marginBottom: '5px' }}><strong>Diretor:</strong> {filme.Director}</p>
        <p style={{ marginBottom: '5px' }}><strong>Elenco:</strong> {filme.Actors}</p>
        <p><strong>Nota IMDB:</strong> ⭐ {filme.imdbRating}</p>
      </div>

      {/* Trocamos o onClick direto por nossa função lidarComFavorito */}
      <button 
        onClick={lidarComFavorito} 
        style={{ marginTop: '20px', background: '#ff9800', color: '#fff', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.3s' }}
      >
        ⭐ Adicionar aos Favoritos
      </button>

      {/* Renderização condicional da mensagem de sucesso */}
      {mensagem && (
        <p style={{ marginTop: '15px', color: '#4CAF50', fontWeight: 'bold', fontSize: '18px' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default DetalhesFilme;