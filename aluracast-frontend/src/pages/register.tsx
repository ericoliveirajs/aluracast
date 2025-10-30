import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao criar conta.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login'); 
      }, 2000);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // (Seus estilos inline...)
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
        <title>Cadastro | AluraCast</title>
      </Head>
      
      <Layout>
        <main>
          <h1>Crie sua Conta</h1>
          
          {success ? (
            <p style={{ color: 'green' }}>Conta criada com sucesso! Redirecionando para o login...</p>
          ) : (
            <form onSubmit={handleSubmit} style={formStyle}>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={inputStyle} />
              </div>
              
              {error && <p style={{ color: 'red' }}>{error}</p>}
              
              <button type="submit" disabled={isLoading} style={buttonStyle}>
                {isLoading ? 'Criando...' : 'Criar conta'}
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/login">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </main>
      </Layout>
    </>
  );
}