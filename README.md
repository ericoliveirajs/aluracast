# AluraCast: Plataforma de Streaming de Podcast (Stack JavaScript Full)

<img width="1919" height="944" alt="image" src="https://github.com/user-attachments/assets/bcce4f59-8385-486e-890d-e29dc7d45b07" />
<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/a88066b9-283d-4d6d-b296-247259f37fb9" />
<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/f7148369-424d-430d-ae89-8255daa2f7f7" />



## Visão Geral do Projeto

O AluraCast é uma plataforma web de streaming de podcasts desenvolvida para demonstrar proficiência na stack JavaScript, abrangendo desde o desenvolvimento de APIs robustas com NestJS até a construção de interfaces de usuário reativas e otimizadas com Next.js e React.

Este projeto simula o consumo de dados de um serviço de Back-end, aplicando boas práticas de arquitetura e performance.

## 🚀 Stack Tecnológica

| Componente | Tecnologia | Detalhe |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (React)** | SSR, Performance, Roteamento, Componentização. |
| **Arquitetura de Estado** | **React Context API** | Gerenciamento de estado global (Player). | 👈 **NOVO**
| **Backend** | **NestJS (Node.js/TypeScript)** | Arquitetura Modular, Injeção de Dependência, Padrão DTO/Service. |
| **Banco de Dados** | **MySQL (via Docker)** | Persistência de Dados, Migração de MOCK para DB Relacional. |
| **ORM** | **TypeORM** | Mapeamento Objeto-Relacional, Uso de Repositórios. |
| **Autenticação** | **JWT (Passport.js)** | Segurança de API, Geração e Validação de Tokens de Acesso. |
| **Gestão de Trabalho** | **GitHub Projects** | Kanban, Backlog, Rastreamento de Issues. |
| **Estilização** | CSS Puro / CSS Modules | Manutenibilidade e Escalabilidade de código CSS. |

## Decisões Arquiteturais e Qualidade de Código

### 1. **AUTENTICAÇÃO E SEGURANÇA (JWT/Passport)**

* **API Protegida:** Implementação completa do fluxo de Autenticação utilizando **JSON Web Tokens (JWT)**.
* **Rotas Protegidas no Front-end:** O link **"Sua Biblioteca"** é uma rota protegida (Issue #17); se o usuário estiver deslogado, ele é redirecionado para a tela de Login.
* **Estratégia de Login:** O módulo `Auth` realiza a validação de credenciais, o *hashing* de senhas (bcrypt) e a geração do Token de Acesso.
* **Guarda de Rotas (Guards):** Aplicação do `JwtAuthGuard` nas rotas de manipulação de dados (`POST`, `PATCH`, `DELETE`), garantindo que apenas usuários com um token válido e ativo possam modificar recursos.

### 2. **ARQUITETURA DE DEPLOY E UX**

* **Gestão de Produto (Kanban):** Todas as funcionalidades e bugs são gerenciados via **GitHub Projects** (Kanban), demonstrando um fluxo de trabalho Ágil.
* **Monorepo Desacoplado (Railway + Vercel):**
    * O **Back-end (NestJS)** e o **Banco de Dados (MySQL)** estão publicados no **Railway.app**.
    * O **Front-end (Next.js)** está publicado no **Vercel** (para melhor performance de SSR).
* **Experiência de Usuário (UX):**
    * O botão de Autenticação foi movido da Sidebar para o **Header** (Issue #16).
    * A seção "Playlists" foi movida da Sidebar para dentro da página "Sua Biblioteca", limpando a navegação principal (Issue P-8).

### 3. **MIGRAÇÃO DE PERSISTÊNCIA: MOCK para MySQL (TypeORM)**

* **API com Persistência Real:** A API busca dados diretamente de um banco de dados **MySQL**.
* **TypeORM:** Implementação do **TypeORM** para mapeamento Objeto-Relacional (ORM) das entidades (`User`, `Episode`).
* **Data Seeding:** O `EpisodesService` (backend) utiliza `OnModuleInit` para popular (fazer "seeding") o banco de dados com 12 episódios de exemplo (com links reais do YouTube) se o banco estiver vazio.

### 4. Otimização de Performance (Front-end)

* **Server-Side Rendering (SSR):** A renderização dos dados é feita através do **`getServerSideProps`** do Next.js, melhorando o SEO e o **Time to Content**.
* **Gestão de Comunicação entre Domínios:** O projeto trata da comunicação entre o domínio do Vercel e do Railway, implementando o **CORS (Cross-Origin Resource Sharing)** no Back-end.

### 5. ARQUITETURA DE ESTADO GLOBAL (React Context) 👈 **NOVO**

* **Player Desacoplado:** Para permitir que a `index.tsx` (cartões) controle o `Layout.tsx` (player), foi implementado o **React Context API** (Issue P-7).
* **Estado Global:** O `PlayerContext` gerencia o episódio selecionado (`episode`) e o estado de reprodução (`isPlaying`).
* **Lógica de Play/Pause:** O player agora é 100% interativo, com ícones dinâmicos (Play/Pause) e áudio funcional (via `react-player`) controlados pelo contexto (Issue P-11).

### 6. DESIGN RESPONSIVO E ACESSIBILIDADE 👈 **NOVO**

* **Mobile-First:** O layout foi refatorado para ser totalmente responsivo (Issue #20). Em telas menores (<= 1023px), a Sidebar e o Player de Desktop são substituídos por um Header fixo e uma Barra de Navegação inferior (`.navbar`), similar a apps como Spotify.
* **CSS Modules:** As páginas de Login e Cadastro foram refatoradas, removendo 100% dos estilos *inline* e adotando **CSS Modules** (`Auth.module.css`) para escopo de estilo (Issue #19).
* **Acessibilidade (A11y):** O HTML foi tornado semântico. Todos os botões de ícone (player, navegação) e links de navegação (sidebar, navbar) agora possuem `aria-label`s descritivos para leitores de tela (Issue #21).

## 🛠️ Como Rodar o Projeto Localmente

Para iniciar o AluraCast, você precisará dos seus serviços de banco, backend e frontend.

### 1. Iniciar o Servidor MySQL (Via Docker) 

O método mais rápido e profissional para garantir que o MySQL esteja rodando corretamente:

* **Pré-requisito:** Instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/).
* **Comandos (na pasta `aluracast-backend`):**
    ```bash
    # Inicia o container do MySQL em background (ele criará o DB 'aluracastdb')
    docker-compose up -d
    ```

### 2. Iniciar os Servidores (NestJS e Next.js)

Abra dois novos terminais.

* **Backend (na pasta `aluracast-backend`):**
    ```bash
    npm install
    npm run start:dev  # Servidor estará em http://localhost:3000
    # O NestJS irá popular o banco automaticamente (Seeding)
    ```

* **Frontend (na pasta `aluracast-frontend`):**
    ```bash
    npm install
    
    # Força o Next.js a rodar na porta 3001 para evitar conflito com o Backend
    # (No Windows/Powershell, use: $env:PORT=3001; npm run dev)
    PORT=3001 npm run dev 
    
    # Acesse o projeto em http://localhost:3001
    ```
