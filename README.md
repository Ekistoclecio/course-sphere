# 🚀 Course Sphere

Uma plataforma moderna para gerenciamento de cursos online, permitindo a criação, administração e consumo de conteúdo educacional de forma intuitiva e eficiente.

## 🧠 Tecnologias

### Frontend
- React / Next.js 15 (App Router)
- TypeScript
- React Query / TanStack Query
- Material UI (MUI)
- NextAuth.js para autenticação
- React Hook Form + Zod
- Dayjs para manipulação de datas

### Backend
- Node.js / NestJS
- TypeORM com PostgreSQL
- JWT para autenticação
- Class Validator
- Bcrypt para hash de senhas

### DevOps
- Docker & Docker Compose
- ESLint + Prettier
- Migrations automatizadas

## 🛠️ Instalação e Execução

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/course-sphere.git
cd course-sphere

# 2. Configure as variáveis de ambiente
Você encontrará exemplos das variáveis de ambiente necessárias nos arquivos `.env.example` dentro das pastas `frontend` e `backend`. Copie esses arquivos para `.env` e configure com seus valores.
```

### Execução em Desenvolvimento

```bash
# 1. Na raiz do projeto, inicie o banco de dados com Docker
docker compose up -d

# 2. Instale as dependências e inicie o backend
cd backend
npm install
npm run migration:run # Execute as migrations do banco
npm run start:dev # Inicia o servidor em modo de desenvolvimento

# 3. Em outro terminal, instale as dependências e inicie o frontend
cd ../frontend
npm install
npm run dev
```

Após executar esses comandos:
- Frontend estará disponível em: http://localhost:3000
- Backend estará disponível em: http://localhost:3001
- Banco de dados PostgreSQL estará rodando na porta 5432

## 🌟 Funcionalidades Principais

### Usuários
- Cadastro e autenticação de usuários
- Edição de perfil
- Gerenciamento de senha com validações
- Exclusão de conta

### Cursos
- Criação e edição de cursos
- Gerenciamento de instrutores
- Listagem de cursos com paginação
- Visualização detalhada de curso

### Aulas
- Upload e gerenciamento de aulas
- Suporte a vídeos
- Organização cronológica
- Controle de acesso

## 🔐 Segurança

- Autenticação JWT com refresh token
- Senhas hasheadas com Bcrypt
- Validação de rotas por permissões
- Proteção contra XSS e CSRF
- Sanitização de inputs

## 📸 Screenshots

| Login | Dashboard | Curso |
|-------|-----------|-------|
| ![Login](screenshots/Captura%20de%20tela%20de%202025-06-25%2021-42-38.png) | ![Dashboard](screenshots/Captura%20de%20tela%20de%202025-06-25%2021-44-26.png) | ![Curso](screenshots/Captura%20de%20tela%20de%202025-06-25%2021-47-02.png) |

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de submeter alterações.

## 📬 Contato

Para dúvidas, sugestões ou reportar problemas, entre em contato através das issues do GitHub.
