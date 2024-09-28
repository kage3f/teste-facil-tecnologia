Projeto de Gestão de Contratos
Este é um projeto de Gestão de Contratos composto por um backend em PHP (com autenticação JWT) e um frontend em React. O sistema permite o gerenciamento de contratos e usuários, com diferentes níveis de permissão (usuários e gestores).

🚀 Tecnologias Utilizadas
Backend: PHP, JWT (JSON Web Token), PostgreSQL, Docker
Frontend: React.js, JWT para autenticação
Containerização: Docker e Docker Compose
📁 Estrutura do Projeto
plaintext
Copiar código
├── backend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── composer.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── README.md

🖥️ Como Rodar o Backend
Pré-requisitos
PHP: Instale PHP 8.0 ou superior
Composer: Gerenciador de dependências do PHP (https://getcomposer.org/)
Docker e Docker Compose: Para rodar a aplicação com PostgreSQL
Passo a Passo
Clone o repositório e navegue até a pasta do backend:

bash
Copiar código
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/kage3f/teste-facil-tecnologia)
cd backend-api
Copie o arquivo .env.example para .env e configure as variáveis de ambiente, como a chave JWT e as credenciais do banco de dados:

bash
Copiar código
cp .env.example .env
Instale as dependências do PHP usando o Composer:

bash
Copiar código
composer install
Construa e suba os containers Docker (incluindo o PostgreSQL):

bash
Copiar código
docker-compose up -d --build
Rode as migrações para criar as tabelas no banco de dados:

bash
Copiar código
php src/migrations.php
Inicie o servidor PHP:

bash
Copiar código
php -S localhost:8888 -t public
Rotas da API
Autenticação
POST /login: Autentica o usuário e retorna um token JWT.
Usuários
GET /users: Retorna a lista de usuários (somente gestores).
POST /users: Cria um novo usuário (somente gestores).
PUT /users/:id: Atualiza um usuário existente.
DELETE /users/:id: Remove um usuário.
Contratos
GET /contracts: Retorna a lista de contratos.
POST /contracts: Cria um novo contrato.
PUT /contracts/:id: Atualiza um contrato existente.
DELETE /contracts/:id: Remove um contrato.
🌐 Como Rodar o Frontend
Pré-requisitos
Node.js: Instale o Node.js versão 14 ou superior
NPM: Gerenciador de pacotes do Node.js (vem com o Node)
Docker e Docker Compose
Passo a Passo
Clone o repositório e navegue até a pasta do frontend:

bash
Copiar código
git clone https://github.com/kage3f/teste-facil-tecnologia
cd frontend
Instale as dependências do projeto:

bash
Copiar código
npm install
Construa e suba os containers Docker (caso esteja rodando em conjunto com o backend):

bash
Copiar código
docker-compose up -d --build
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
Funcionalidades Principais
Autenticação: O usuário pode fazer login com um nome de usuário e senha.
Gerenciamento de Contratos: Criação, edição e exclusão de contratos.
Gerenciamento de Usuários: Apenas usuários com função de gestor podem gerenciar outros usuários.
📋 Notas Finais
Obrigado pela oportunidade!

