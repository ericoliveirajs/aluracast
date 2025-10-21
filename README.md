# AluraCast: Plataforma de Streaming de Podcast (Stack JavaScript Full)

<img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/22800555-03cb-46f7-bb17-16dea7089d20" />


## Visão Geral do Projeto

O AluraCast é uma plataforma web de streaming de podcasts desenvolvida para demonstrar proficiência na stack JavaScript, abrangendo desde o desenvolvimento de APIs robustas com NestJS até a construção de interfaces de usuário reativas e otimizadas com Next.js e React.
Foi utilizado um projeto base criado no início da minha carreira que utilizava somente HTML e CSS puro, repositório de referência: https://github.com/ericoliveirajs/alura_play

Este projeto simula o consumo de dados de um serviço de Back-end, aplicando boas práticas de arquitetura e performance.

## 🚀 Stack Tecnológica

| Componente | Tecnologia | Foco em Entrevista |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (React)** | SSR, Performance, Roteamento, Componentização. |
| **Backend** | **NestJS (Node.js/TypeScript)** | Arquitetura Modular, Injeção de Dependência, Padrão DTO/Service. |
| **Estilização** | CSS Puro (Metodologia BEM/OO-CSS) | Manutenibilidade e Escalabilidade de código CSS. |

## Decisões Arquiteturais e Qualidade de Código

Este projeto não é apenas um front-end estático; ele demonstra a capacidade de projetar uma aplicação desacoplada e eficiente.

### 1. Desacoplamento de Dados e Serviço (Back-end)

* **API RESTful Simulado:** Foi construído um Back-end dedicado em **NestJS** para simular o serviço de dados. As playlists (`hipsters-ponto-tech`, `indicados-para-voce`, etc.) são fornecidas através de rotas REST.
* **MOCK de Dados Estratégico:** A simulação de dados (*MOCK*) está centralizada no `EpisodesService`, garantindo que o Back-end atue como a **fonte única de verdade**, desacoplando totalmente a lógica de visualização do Front-end.

### 2. Otimização de Performance (Front-end)

* **Server-Side Rendering (SSR):** A renderização dos dados das playlists não é feita pelo navegador (Client-Side Rendering), mas sim através do **`getServerSideProps`** do Next.js.
    * **Vantagem:** Isso garante que o conteúdo seja pré-renderizado no servidor, melhorando o **SEO (Search Engine Optimization)** e o **Time to Content** (velocidade de carregamento da página).
* **Componentização e Reutilização:** O cartão de episódio (`EpisodeCard`) foi criado como um componente funcional separado, garantindo alta **reutilização** e clareza no `Home`.

### 3. Resolução de Problemas Complexos (Debugging)

* **Gestão de Comunicação entre Portas:** O projeto exigiu a configuração correta de comunicação entre a porta `3001` (Front-end) e a porta `3000` (Back-end).
    * **Solução:** Implementação do **CORS (Cross-Origin Resource Sharing)** no Back-end para permitir a troca de dados, demonstrando compreensão de protocolos de segurança de rede.
* **Tratamento de Caminhos de Imagem:** A URL de mídia foi resolvida através da concatenação da `API_URL` (`http://localhost:3000`) com o caminho relativo (`/images/...`), garantindo que o navegador busque os arquivos no servidor Back-end correto.

## 🛠️ Como Rodar o Projeto Localmente

Para iniciar o AluraCast, você precisará de dois terminais:

### 1. Iniciar o Backend e FrontEnd (NestJS)

```bash
# Navegue até a pasta do projeto backend (aluracast-backend)
npm install
npm run start:dev 

# O servidor estará rodando em http://localhost:3000

# Navegue até a pasta do projeto frontend (aluracast-frontend)
npm install
# Inicie na porta 3001 para evitar conflito com o Backend (3000)
npm run dev -- --turbo --port 3001 

# Acesse o projeto em http://localhost:3001
