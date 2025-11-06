import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Episode } from '@interfaces/episode.interface'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface LayoutProps {
  children: React.ReactNode;
  latestEpisode?: Episode; 
}

const Layout: React.FC<LayoutProps> = ({ children, latestEpisode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/'); 
  };

  return (
    <>
      {/* --- CORREÇÕES ISSUE #21 (Acessibilidade) --- */}
      <header className="cabecalho container">
        
        <div className="cabecalho__navegacao">
          <button className="cabecalho__botao" aria-label="Voltar navegação">
            <img src="/assets/img/seta-voltar.svg" alt="" />
          </button>
          <button className="cabecalho__botao" aria-label="Avançar navegação">
            <img src="/assets/img/seta-avançar.svg" alt="" />
          </button>
        </div>
        
        <div className="cabecalho__auth">
            {isLoggedIn ? (
                <button
                    className="cabecalho__botao--auth menu-lateral__link"
                    onClick={handleLogout}
                >
                    Sair
                </button>
            ) : (
                <button
                    className="cabecalho__botao--auth menu-lateral__link"
                    onClick={() => router.push('/login')}
                >
                    Fazer Login
                </button>
            )}
        </div>
      </header>

      <aside className="menu-lateral">
        <h1 className="menu-lateral__logo">
            <Link href="/" aria-label="Ir para a Home - Logo AluraCast">
              <img src="/assets/img/alura-Cast_logo.svg" alt="Logotipo da AluraCast" />
            </Link>
        </h1>
        
        {/* --- ESTRUTURA CORRETA (Classes no LI) + ACESSIBILIDADE --- */}
        <nav aria-label="Navegação Principal">
          <ul>
            <li className={`menu-lateral__link menu-lateral__link--home ${router.pathname === '/' ? 'ativo' : ''}`}>
                <Link href="/">Home</Link>
            </li>
            
            <li className="menu-lateral__link menu-lateral__link--busca">
                <Link href="#">Busca</Link>
            </li>

            <li className={`menu-lateral__link menu-lateral__link--biblioteca ${router.pathname === '/biblioteca' ? 'ativo' : ''}`}>
                {isLoggedIn ? (
                    <Link href="/biblioteca">Sua Biblioteca</Link>
                ) : (
                    <Link href="/login">Sua Biblioteca</Link>
                )}
            </li>
          </ul>
        </nav>
        
        {/* <h3 className="menu-lateral__playlist">Playlists</h3>
        <nav aria-label="Navegação de Playlists">
          <ul>
            {isLoggedIn ? (
              <>
                <li className="menu-lateral__link menu-lateral__link--playlist">
                    <Link href="#">Criar Playlist</Link>
                </li>
                <li className="menu-lateral__link menu-lateral__link--podcasts">
                    <Link href="#">Podcasts salvos</Link>
                </li>
              </>
            ) : (
              null 
            )}
          </ul>
        </nav> */}
      </aside>

      <main className="principal container">
        {children}
      </main>

      <div className="navbar">
        <ul className="navbar__items">
          <li className={`navbar__item navbar__item--home ${router.pathname === '/' ? 'ativo-mobile' : ''}`}>
            <Link href="/" aria-label="Home">Home</Link>
          </li>
          
          <li className={`navbar__item navbar__item--busca ${router.pathname === '/busca' ? 'ativo-mobile' : ''}`}>
            <Link href="#" aria-label="Busca">Busca</Link>
          </li>
          
          <li className={`navbar__item navbar__item--biblioteca ${router.pathname === '/biblioteca' ? 'ativo-mobile' : ''}`}>
            {isLoggedIn ? (
              <Link href="/biblioteca" aria-label="Sua Biblioteca">Biblioteca</Link>
            ) : (
              <Link href="/login" aria-label="Fazer Login">Biblioteca</Link>
            )}
          </li>
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

          <button className="rodape__botao rodape__botao--voltar" aria-label="Repetir episódio">
            <img src="/assets/img/icone-replay.svg" alt="" />
          </button>
          <button className="rodape__botao rodape__botao--anterior" aria-label="Episódio anterior">
            <img src="/assets/img/icone-anterior.svg" alt="" />
          </button>
          <button className="rodape__botao rodape__botao--play" aria-label="Tocar ou Pausar">
            <img src="/assets/img/icone-play.svg" alt="" />
          </button>
          <button className="rodape__botao rodape__botao--avancar" aria-label="Pular episódio">
            <img src="/assets/img/icone-proximo.svg" alt="" />
          </button>
          <button className="rodape__botao rodape__botao--proximo" aria-label="Avançar 15 segundos">
            <img src="/assets/img/icone-avancar.svg" alt="" />
          </button>

          <span className="rodape__horario rodape__horario--inicio">10:05</span>
          <div className="barra__container--reproducao">
            <div className="rodape__barra rodape__barra--reproducao">
              <div></div>
            </div>
          </div>
          <span className="rodape__horario rodape__horario--termino">18:35</span>
          
          <button className="rodape__botao rodape__botao--volume-down" aria-label="Diminuir volume">
            <img src="/assets/img/icone-volume-down.svg" alt="" />
          </button>
          <div className="barra__container--volume">
            <div className="rodape__barra rodape__barra--volume">
              <div></div>
            </div>
          </div>
          <button className="rodape__botao rodape__botao--volume-up" aria-label="Aumentar volume">
            <img src="/assets/img/icone-volume-up.svg" alt="" />
          </button>
        </footer>
      {/* --- FIM DAS CORREÇÕES --- */}
    </>
  );
};

export default Layout;