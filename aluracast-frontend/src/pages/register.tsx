import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- IMPORT ATUALIZADO ---
// Usando o atalho '@/' que aponta para a pasta 'src/'
import Layout from '@/components/Layout';

// (Se o '@/' não funcionar, use o relativo sem .tsx)
// import Layout from '../components/Layout';

// import styles from '../styles/Auth.module.css'; // (Vamos usar um style inline por enquanto)


export default function RegisterPage() {
  // --- Estados para controlar o formulário ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // --- Estados para feedback ao usuário ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // --- Hook para redirecionar após o cadastro ---
  const router = useRouter();

  // --- Função para lidar com o envio do formulário ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // NOTA: Ajuste o localhost:3001 para a porta do SEU backend
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    try {
      const res = await fetch(`${API_URL}/users/register`, { // <-- Endpoint de Cadastro
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

      // --- SUCESSO! ---
      setSuccess(true);
      
      // Redireciona para o login após 2 segundos
      setTimeout(() => {
        router.push('/login'); 
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // (Usando os mesmos estilos inline do login.tsx)
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
      
      {/* --- LAYOUT DESCOMENTADO --- */}
      <Layout>
        <main>
          <h1>Crie sua Conta</h1>
          
          {success ? (
            <p style={{ color: 'green' }}>Conta criada com sucesso! Redirecionando para o login...</p>
          ) : (
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
      {/* --- LAYOUT DESCOMENTADO --- */}
    </>
  );
}