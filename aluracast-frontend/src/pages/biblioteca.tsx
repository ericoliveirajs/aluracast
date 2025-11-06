import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout'; 

export default function BibliotecaPage() {
  return (
    <Layout>
      <Head>
        <title>Sua Biblioteca | AluraCast</title>
      </Head>
      
      <main className="principal container">
        <div style={{ paddingTop: '2.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Sua Biblioteca</h1>
            <p style={{ marginBottom: '2rem' }}>Bem-vindo aos seus podcasts favoritos.</p>
            
            <section>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Minhas Playlists</h2>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li className="menu-lateral__link menu-lateral__link--playlist" style={{ marginBottom: '1rem' }}>
                        <Link href="#">Criar Playlist</Link>
                    </li>
                    <li className="menu-lateral__link menu-lateral__link--podcasts" style={{ marginBottom: '1rem' }}>
                        <Link href="#">Podcasts salvos</Link>
                    </li>
                </ul>
            </section>
            
        </div>
      </main>
    </Layout>
  );
}