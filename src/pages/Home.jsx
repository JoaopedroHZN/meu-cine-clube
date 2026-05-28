// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [listaFilmes, setListaFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Aqui é a chave da sua API (se você não tiver criado a sua ainda no site deles, 
  // pode deixar essa que é uma chave pública de testes)
  const API_KEY = 'trilogy'; 

  useEffect(() => {
    // Criamos uma função assíncrona porque a internet demora para responder
    async function buscarFilmesDaAPI() {
      try {
        // Fazendo a requisição GET para a OMDb API buscando pela palavra "pokemon"
        const resposta = await fetch(`https://www.omdbapi.com/?s=pokemon&apikey=${API_KEY}`);
        const dados = await resposta.json();

        // A OMDb devolve os filmes dentro de um array chamado 'Search'
        if (dados.Search) {
          setListaFilmes(dados.Search);
        }
      } catch (erro) {
        console.error("Erro ao buscar a API:", erro);
      } finally {
        // Tira o aviso de "Carregando" da tela quando terminar
        setCarregando(false); 
      }
    }

    // Executa a função assim que a página Home abrir
    buscarFilmesDaAPI();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🍿 Catálogo de Filmes</h2>
      
      {/* Mensagem de espera para o usuário não achar que travou */}
      {carregando ? (
        <p>Buscando filmes no servidor...</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
          
          {listaFilmes.map(filme => (
            // A OMDb usa letras maiúsculas no ID (imdbID), Titulo (Title), etc.
            <div key={filme.imdbID} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '200px' }}>
              <img src={filme.Poster} alt={filme.Title} style={{ width: '100%', borderRadius: '5px' }} />
              <h4 style={{ margin: '10px 0 5px' }}>{filme.Title}</h4>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>Ano: {filme.Year}</p>
              
              <Link 
                to={`/filme/${filme.imdbID}`} 
                style={{ background: '#4CAF50', color: 'white', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px', display: 'block' }}
              >
                Ver Detalhes
              </Link>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Home;