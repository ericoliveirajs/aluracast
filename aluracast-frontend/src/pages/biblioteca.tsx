import Head from 'next/head';
import Layout from '@/components/Layout'; 

// Este é um componente de rota protegida
export default function BibliotecaPage() {
  return (
    <Layout>
      <Head>
        <title>Sua Biblioteca | AluraCast</title>
      </Head>

      <main>
        <div style={{ padding: '2rem' }}>
            <h1>Sua Biblioteca</h1>
            <p>Bem-vindo aos seus podcasts favoritos.</p>

            <section>
                <h2>Minhas Playlists</h2>
                <p style={{ opacity: 0.7 }}>Conteúdo da Issue P-11 (Podcasts Salvos) virá aqui.</p>
            </section>

        </div>
      </main>
    </Layout>
  );
}