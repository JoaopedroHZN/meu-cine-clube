# 🎬 MeuCineClube

Um catálogo interativo de filmes construído em React, que permite aos utilizadores pesquisar filmes de uma API pública, guardar os seus títulos favoritos e alternar entre os temas claro e escuro.

## 🚀 Tecnologias Utilizadas
* **React:** Biblioteca principal para a construção da interface.
* **Vite:** Ferramenta de build rápida.
* **React Router Dom:** Gestão das rotas da Single Page Application (SPA).
* **Context API:** Gestão de estados globais (Tema, Autenticação e Favoritos).
* **OMDb API:** Consumo de dados reais de filmes através de pedidos HTTP (`fetch`).

## ⚙️ Instalação e Execução
1. Clone este repositório:
   ```bash
   git clone [https://github.com/JoaopedroHZN/meu-cine-clube.git](https://github.com/JoaopedroHZN/meu-cine-clube.git)
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
✨ Funcionalidades
Navegação SPA: Transição fluida entre ecrãs sem recarregar a página.

Pesquisa de Filmes: Consumo da OMDb API para listar filmes em tempo real.

Login Simulado: Sistema de autenticação persistido no localStorage.

Rotas Protegidas (Gatekeeper): A página de favoritos bloqueia utilizadores não autenticados e redireciona-os para a página de login.

Gestão de Favoritos: Adicionar e remover filmes da lista de favoritos com persistência local.

Modo Escuro: Botão no cabeçalho para alternar o tema da aplicação globalmente.

🧠 Conceitos Aplicados
Este projeto foi desenvolvido aplicando fundamentos avançados de React:

Resolução de Prop Drilling com a utilização da Context API.

Proteção de rotas privadas utilizando useContext, <Outlet /> e <Navigate />.

Gestão de efeitos colaterais e pedidos assíncronos com useEffect e useState.