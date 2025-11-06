import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/Auth.module.css';

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

  return (
    <>
      <Head>
        <title>Cadastro | AluraCast</title>
      </Head>
      
      <Layout>
        <main>
          <div className={styles.container}>
            <h1 className={styles.title}>Crie sua Conta</h1>
            
            {success ? (
              <p className={styles.success}>Conta criada com sucesso! Redirecionando para o login...</p>
            ) : (
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
                  {isLoading ? 'Criando...' : 'Criar conta'}
                </button>
              </form>
            )}

            <div className={styles.link}>
              <Link href="/login">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}