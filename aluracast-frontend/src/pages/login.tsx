import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // <-- ADICIONADO
import Layout from '@/components/Layout'; 

// import styles from '../styles/Auth.module.css'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Corrigido para 3000

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Credenciais inválidas');
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        router.push('/'); 
      } else {
        throw new Error('Token de acesso não recebido da API.');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // (Estilos inline)
  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '2rem auto',
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    fontSize: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: isLoading ? '#ccc' : '#0070f3',
    color: 'white',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
  };

  return (
    <>
      <Head>
        <title>Login | AluraCast</title>
      </Head>
      
      <Layout>
        <main>
          <h1>Página de Login</h1>
          
          <form onSubmit={handleSubmit} style={formStyle}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={inputStyle}
              />
            </div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <button type="submit" disabled={isLoading} style={buttonStyle}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* --- BLOCO ADICIONADO --- */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/register">
              Não tem uma conta? Crie uma agora
            </Link>
          </div>
          {/* --- FIM DO BLOCO --- */}

        </main>
      </Layout>
    </>
  );
}