import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; 
import Layout from '@/components/Layout'; 
import styles from '@/styles/Auth.module.css';

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

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  return (
    <>
      <Head>
        <title>Login | AluraCast</title>
      </Head>
      
      <Layout>
        <main>
          <div className={styles.container}>
            <h1 className={styles.title}>Acesse sua conta</h1>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className={styles.inputField} 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Senha</label>
                <input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength={6} 
                  className={styles.inputField} 
                />
              </div>
              
              {error && <p className={styles.error}>{error}</p>}
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className={styles.submitButton}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className={styles.link}>
              <Link href="/register">
                Não tem uma conta? Crie uma agora
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}