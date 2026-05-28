// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// A ferramenta de mudar de página por código [cite: 202, 361]
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [nome, setNome] = useState('');
  // Puxamos a função de login lá da nossa antena do AuthContext 
  const { login } = useContext(AuthContext); 
  // Ligamos o motorzinho de navegação 
  const navigate = useNavigate(); 

  function realizarLogin(evento) {
    evento.preventDefault(); // Evita que o formulário recarregue a página inteira
    
    if (nome.trim() === '') return; // Bloqueia nomes vazios

    login(nome); // Faz o login (e o useEffect do context salva no localStorage) 
    navigate('/'); // Redireciona o cara na mesma hora pra Home ("/") 
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔑 Identifique-se</h2>
      {/* Formulário chamando o realizarLogin  */}
      <form onSubmit={realizarLogin}>
        <input 
          type="text" 
          placeholder="Qual seu nome?" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;