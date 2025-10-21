import React from 'react';
import Link from 'next/link';
const API_URL = 'http://localhost:3000';


import { Episode } from '@interfaces/episode.interface'; 

interface LayoutProps {
  children: React.ReactNode;
  latestEpisode?: Episode; 
}

const Layout: React.FC<LayoutProps> = ({ children, latestEpisode }) => {
  return (
    <>
      <header className="cabecalho container">
        <button className="cabecalho__botao">
          <img src="/assets/img/seta-voltar.svg" alt="Seta voltar" />
        </button>
        <button className="cabecalho__botao">
          <img src="/assets/img/seta-avançar.svg" alt="Seta avancar" />
        </button>
      </header>

      <aside className="menu-lateral">
        <h1 className="menu-lateral__logo">
            <img src="/assets/img/alura-Cast_logo.svg" alt="Logotipo da AluraCast" />
        </h1>
        
        <nav>
          <ul>
            <li className="menu-lateral__link menu-lateral__link--home ativo">
                <Link href="/">Home</Link>
            </li>
            <li className="menu-lateral__link menu-lateral__link--busca">
                <Link href="#">Busca</Link>
            </li>
            <li className="menu-lateral__link menu-lateral__link--biblioteca">
                <Link href="#">Sua Biblioteca</Link>
            </li>
          </ul>
        </nav>
        
        <h3 className="menu-lateral__playlist">Playlists</h3>
        <ul>
          <li className="menu-lateral__link menu-lateral__link--playlist">
              <Link href="#">Criar Playlist</Link>
          </li>
          <li className="menu-lateral__link menu-lateral__link--podcasts">
              <Link href="#">Podcasts salvos</Link>
          </li>
        </ul>
      </aside>

      <main className="principal container">
        {children}
      </main>

      <div className="navbar">
        <ul className="navbar__items">
          <li className="navbar__item navbar__item--home">Home</li>
          <li className="navbar__item navbar__item--busca">Busca</li>
          <li className="navbar__item navbar__item--biblioteca">Biblioteca</li>
        </ul>
      </div>

        <footer className="rodape">
          <img 
            className="rodape__imagem" 
            src={latestEpisode ? `${API_URL}${latestEpisode.image}` : "/assets/img/hipsters-9.svg"} 
            alt={latestEpisode ? latestEpisode.title : "Player Vazio"} 
          />
          <h3 className="rodape__titulo">{latestEpisode ? latestEpisode.title : "Selecione um Episódio"}</h3>
          <h4 className="rodape__subtitulo">AluraCast</h4> 

          <button className="rodape__botao rodape__botao--voltar">
            <img src="/assets/img/icone-replay.svg" alt="Replay" />
          </button>
          <button className="rodape__botao rodape__botao--anterior">
            <img src="/assets/img/icone-anterior.svg" alt="Anterior" />
          </button>
          <button className="rodape__botao rodape__botao--play">
            <img src="/assets/img/icone-play.svg" alt="Play" />
          </button>
          <button className="rodape__botao rodape__botao--avancar">
            <img src="/assets/img/icone-proximo.svg" alt="Próximo" />
          </button>
          <button className="rodape__botao rodape__botao--proximo">
            <img src="/assets/img/icone-avancar.svg" alt="Avançar" />
          </button>

          <span className="rodape__horario rodape__horario--inicio">10:05</span>
          <div className="barra__container--reproducao">
            <div className="rodape__barra rodape__barra--reproducao">
              <div></div>
            </div>
          </div>
          <span className="rodape__horario rodape__horario--termino">18:35</span>
          <button className="rodape__botao rodape__botao--volume-down">
            <img src="/assets/img/icone-volume-down.svg" alt="Diminuir Volume" />
          </button>
          <div className="barra__container--volume">
            <div className="rodape__barra rodape__barra--volume">
              <div></div>
            </div>
          </div>
          <button className="rodape__botao rodape__botao--volume-up">
            <img src="/assets/img/icone-volume-up.svg" alt="Aumentar Volume" />
          </button>
        </footer>
    </>
  );
};

export default Layout;