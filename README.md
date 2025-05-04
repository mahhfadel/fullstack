# fullstack
Projeto desenvolvido para a materia de Full Stack na UTFPR-CP


# CoinGecko API

Projeto desenvolvido para a disciplina **Programação Web Fullstack**, por Lucas Genvigir e Maria Clara Fadel. A aplicação consome dados da [CoinGecko API](https://www.coingecko.com/en/api) e exibe informações sobre criptomoedas em tempo real.

## 📌 Descrição

O objetivo principal deste projeto é demonstrar o uso de **AJAX** e **React.js** em uma **Single Page Application (SPA)**. A aplicação permite ao usuário visualize uisar criptomoedas específicas.

O projeto utiliza:

- ⚛️ Criação da estrutura do projeto utilizando create-react-app.
- 🌐 **CoinGecko API** como fonte de dados aberta em JSON.
- 🧠  **useRef** para tornar a API leve e mostrar dados dinamicamente
- 💅 Biblioteca de componentes **Material UI**.

---

## 📂 Estrutura do Projeto
O projeto segue uma organização modular, separando componentes e contextos para manter a aplicação escalável e de fácil manutenção:


fullstack-lucas-e-maria/
├── public/
├── src/
│ ├── components/ # Componentes React reutilizáveis (JSX)
│ ├── contexts/ # Context API para estado global (se necessário)
│ ├── App.js # Componente principal da aplicação
│ ├── index.js # Ponto de entrada da aplicação React
├── package.json # Dependências e scripts do projeto
├── README.md

---

## 🧪 Tecnologias Utilizadas

- [React.js](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [useRef (React Hook)](https://reactjs.org/docs/hooks-reference.html#useref)
- [Axios](https://axios-http.com/) (ou `fetch` para requisições AJAX)

---

## 🔧 Como Executar o Projeto 

1. **Clone o repositório:**

```bash
git clone https://github.com/mahhfadel/fullstack.git

2. **Acesse a página do projeto:**

```bash
cd fullstack-lucas-e-maria

3. **Instale as dependências:**

```bash
npm install

4. **Inicie o servidor de desenvolvimento:**

```bash
npm start


A aplicação será aberta em http://localhost:3000.