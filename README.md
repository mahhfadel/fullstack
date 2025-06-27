# fullstack
Projeto desenvolvido para a materia de Full Stack na UTFPR-CP


# CoinGecko API

Projeto desenvolvido para a disciplina **Programação Web Fullstack**, por Lucas Genvigir e Maria Clara Fadel. A aplicação consome dados da [CoinGecko API](https://www.coingecko.com/en/api) e exibe informações sobre criptomoedas em tempo real.

## 📌 Descrição

Este projeto fullstack demonstra a construção de um sistema com React.js no frontend e Node.js/Express no backend, integrando com banco de dados MongoDB Atlas.

A aplicação permite ao usuário buscar e visualizar informações de criptomoedas específicas, salvar o histórico de buscas, navegar por ele de forma paginada e autenticar usuários com segurança.

O projeto utiliza:
- ⚛️ Frontend React criado com create-react-app e estilizado com Material UI.
- 🌐 Consumo da CoinGecko API para dados dinâmicos de criptomoedas.
- 🔒 Backend Express com autenticação JWT, controle de roles (usuário/admin) e segurança.
- 🗃️ Banco de dados MongoDB Atlas para armazenar usuários e histórico de buscas.
- 📜 Histórico de buscas gravado no backend, paginado em lotes de 10.
- 🚦 Middleware de autenticação e autorização para proteger rotas.
- 🔑 Senhas criptografadas com bcrypt e token JWT com expiração.
- ⚙️ Configuração de pool de conexões MongoDB para otimização.
- 🔍 Logs detalhados para monitoramento de autenticação e operações importantes.
- 🌐 Uso de HTTPS local para desenvolvimento seguro (com certificado autoassinado).
- 🔄 Proxy configurado no frontend para facilitar requisições ao backend sem mudar portas.

---

## 🧪 Tecnologias Utilizadas

Frontend
- React.js
- Material UI
- CoinGecko API
- Axios
- JavaScript ES6+, React Hooks (useRef, useState, useEffect)

Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose para modelagem ODM
- bcrypt para hash de senhas
- jsonwebtoken para autenticação JWT
- Middleware customizado para autenticação e autorização de usuários
- Pool de conexões MongoDB configurado para performance
- Logs detalhados de operações e erros

---

## 🔧 Funcionalidades Backend Implementadas
- Cadastro de usuário com validação e senha criptografada.
- Login com geração e validação de token JWT.
- Validação de token para proteger rotas.
- Gerenciamento de usuários: listagem, atualização de nome, senha, papel (admin/user), exclusão.
- Histórico de buscas:
-- Armazenamento dos dados da busca (nome da cripto, símbolo e preço).
-- Listagem paginada (10 registros por página).
-- Deleção de entradas específicas e limpeza total do histórico.
- Middleware de segurança para prevenir injeções, ataques de força bruta (rate limiting custom), XSS e falhas de autenticação.
- Logs detalhados com data e hora para monitoramento de acessos, erros e ações críticas.
- Suporte HTTPS para ambiente de desenvolvimento (com certificado autoassinado).
- Pool de conexões MongoDB configurado para otimizar performance.

---

## 🔧 Como Executar o Projeto 

```bash
1. **Clone o repositório:**
git clone https://github.com/mahhfadel/fullstack.git

2. **Acesse a página do projeto:**
cd fullstack-lucas-e-maria

3. **Instale as dependências:**
npm install

4. **Inicie o servidor de desenvolvimento frontend:**
Para uso de backend local
npm start 

Para uso de backend remoto (pode demorar um pouco para ligar pois por se tratar de uma hospedagem gratuita ela não fica o tempo todo disponivel, verifique o status por esse link "https://fullstack-rvm2.onrender.com/")
npm run start:prod

5. **Abra um novo prompt:**

6. **Acesse o repositorio do back:**
cd back

7. **Instale as dependências:**
npm install

8. **Gere certificados SSL para HTTPS loca:**
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365

9. **Crie um arquivo .env na raiz do backend com as variáveis:**
MONGO_URI=
JWT_SECRET=

10. **Inicie o servidor de desenvolvimento backend:**
npm run dev

11. **Pode ser necessário abrir https://localhost:8000 e aceitar o aviso de segurança manualmente**

Acesse a aplicação em http://localhost:3000/login.
```
---

## 📌 Observações importantes
- Senhas são armazenadas de forma segura utilizando bcrypt.
- Tokens JWT expiram após 2 horas para maior segurança.
- O histórico de buscas é armazenado por usuário e pode ser paginado e gerenciado via API.
**- Certifique-se de configurar o whitelist de IP no MongoDB Atlas para permitir conexões.**
- Utilize HTTPS no backend para evitar problemas de segurança, mesmo no ambiente local.
- Logs detalhados ajudam a monitorar o sistema e identificar falhas ou acessos indevidos.
