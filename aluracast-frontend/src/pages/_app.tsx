import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/styles/base.css';
import '@/styles/grid/index.css';
import '@/styles/responsivo.css';
import '@/styles/grid/cartao.css';
import '@/styles/grid/navbar.css';
import '@/styles/grid/menu.css';
import '@/styles/grid/rodape.css';
import '@/styles/grid/secao.css';
import '@/styles/Auth.module.css';


import { PlayerProvider } from '@/contexts/PlayerContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <Component {...pageProps} />
    </PlayerProvider>
  );
}