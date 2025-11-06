import { createContext, useState, useContext, ReactNode } from 'react';
import { Episode } from '@interfaces/episode.interface'; 

interface PlayerContextData {
  episode: Episode | null; 
  isPlaying: boolean;        
  selectEpisode: (episode: Episode) => void; 
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function selectEpisode(episode: Episode) {
    setEpisode(episode);
    setIsPlaying(true); 
  }

  function play() {
    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  return (
    <PlayerContext.Provider 
      value={{ 
        episode, 
        isPlaying, 
        selectEpisode, 
        play, 
        pause,
        togglePlayPause
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}