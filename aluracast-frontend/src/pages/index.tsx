import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { Episode } from '@interfaces/episode.interface';
import { usePlayer } from '@/contexts/PlayerContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface HomeProps {
  hipsters: Episode[];
  indicados: Episode[];
  fronteiras: Episode[];
  error: boolean;
}

const EpisodeCard: React.FC<{ episode: Episode }> = ({ episode }) => {
  const { selectEpisode } = usePlayer();

  return (
    <li className="cartao" key={episode.id} onClick={() => selectEpisode(episode)}>

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
        selectEpisode(episode);
      }}>
      </button>
    </li>
  );
};


export default function Home({ hipsters, indicados, fronteiras, error }: HomeProps) {
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
    <Layout>
      <Head>
        <title>AluraCast - Podcast de Tecnologia da Alura</title>
      </Head>

      <main className="principal container">

        <section className="secao secao-vertical">
          <h2 className="secao__titulo">Hipsters Ponto Tech</h2>
          <a className="secao__link" href="#">Ver mais</a>
          <ul className="secao__cartoes">
            {(Array.isArray(hipsters) ? hipsters : []).map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </ul>
        </section>

        <section className="secao secao-vertical">
          <h2 className="secao__titulo">Indicados para você</h2>
          <a className="secao__link" href="">Ver mais</a>
          <ul className="secao__cartoes">
            {(Array.isArray(indicados) ? indicados : []).map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </ul>
        </section>

        <section className="secao secao-vertical">
          <h2 className="secao__titulo">Dev sem Fronteiras</h2>
          <a className="secao__link" href="#">Ver mais</a>
          <ul className="secao__cartoes">
            {(Array.isArray(fronteiras) ? fronteiras : []).map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const API_URL_SERVER = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const hipstersResponse = await fetch(`${API_URL_SERVER}/episodes/playlists/hipsters-ponto-tech`);
    const hipsters: Episode[] = await hipstersResponse.json();

    const indicadosResponse = await fetch(`${API_URL_SERVER}/episodes/playlists/indicados-para-voce`);
    const indicados: Episode[] = await indicadosResponse.json();

    const fronteirasResponse = await fetch(`${API_URL_SERVER}/episodes/playlists/dev-sem-fronteiras`);
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