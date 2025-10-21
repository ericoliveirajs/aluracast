import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Layout from '@/components/Layout'; 
import { Episode } from '@interfaces/episode.interface'; 

const API_URL = 'http://localhost:3000';

interface HomeProps {
  hipsters: Episode[]; 
  indicados: Episode[]; 
  fronteiras: Episode[]; 
  error: boolean;
}

const EpisodeCard: React.FC<{ episode: Episode, onSelect: (ep: Episode) => void }> = ({ episode, onSelect }) => (
  <li className="cartao" key={episode.id} onClick={() => onSelect(episode)}>
  
    <img 
      className="cartao__imagem" 
      src={episode.image.startsWith('/') ? `${API_URL}${episode.image}` : episode.image} 
      alt={episode.title} 
    />
    
    <h3 className="cartao__titulo">{episode.title}</h3>
    <h4 className="cartao__subtitulo">{episode.description}</h4> 
    <div className="cartao__player"></div> 
    
    <button className="cartao__botao" onClick={(e) => {
      e.stopPropagation();
      onSelect(episode);
    }}>
    </button>
  </li>
);


export default function Home({ hipsters, indicados, fronteiras, error }: HomeProps) {
    
  const [playerEpisode, setPlayerEpisode] = useState<Episode | undefined>(undefined);

  const handleEpisodeSelection = (episode: Episode) => {
    setPlayerEpisode(episode);
  };


  if (error) {
    return (
      <Layout>
        <main className="principal container">
          <div className="secao" style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Erro de Conexão!</h1>
            <p>Verifique se o servidor backend Nest.js está rodando em {API_URL}</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout latestEpisode={playerEpisode}>
      <Head>
        <title>AluraCast - Podcast de Tecnologia da Alura</title>
      </Head>

      <main className="principal container">
        
        <section className="secao secao-vertical">
          <h2 className="secao__titulo">Hipsters Ponto Tech</h2>
          <a className="secao__link" href="#">Ver mais</a>
          <ul className="secao__cartoes">
            {(Array.isArray(hipsters) ? hipsters : []).map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} onSelect={handleEpisodeSelection} />
            ))}
          </ul>
        </section>

        <section className="secao secao-vertical">
          <h2 className="secao__titulo">Indicados para você</h2>
          <a className="secao__link" href="">Ver mais</a>
          <ul className="secao__cartoes">
            {(Array.isArray(indicados) ? indicados : []).map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} onSelect={handleEpisodeSelection} />
            ))}
          </ul>
        </section>

        <section className="secao secao-vertical">
          <h2 className="secao__titulo">Dev sem Fronteiras</h2>
          <a className="secao__link" href="#">Ver mais</a>
          <ul className="secao__cartoes">
            {(Array.isArray(fronteiras) ? fronteiras : []).map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} onSelect={handleEpisodeSelection} />
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const hipstersResponse = await fetch(`${API_URL}/episodes/playlists/hipsters-ponto-tech`);
    const hipsters: Episode[] = await hipstersResponse.json();

    const indicadosResponse = await fetch(`${API_URL}/episodes/playlists/indicados-para-voce`);
    const indicados: Episode[] = await indicadosResponse.json();
    
    const fronteirasResponse = await fetch(`${API_URL}/episodes/playlists/dev-sem-fronteiras`);
    const fronteiras: Episode[] = await fronteirasResponse.json();
    

    return { props: { hipsters, indicados, fronteiras, error: false } };
  } catch (e) {
    console.error('Erro ao buscar dados da API do Backend:', e);
    return {
      props: {
        hipsters: [],
        indicados: [],
        fronteiras: [],
        error: true,
      },
    };
  }
};