import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import { defaultAnimationConfig } from './animationConfig'; // Import the default configuration
import { AnimationConfig } from '../interfaces/animationConfigInterface';

interface AnimationConfigProviderProps {
  children: ReactNode;
}

// Create the context
const AnimationConfigContext = createContext<{
  animationConfig: AnimationConfig;
  setAnimationConfig: React.Dispatch<React.SetStateAction<AnimationConfig>>;
} | null>(null);

// Context hook
export const useAnimationConfig = () => {
  const context = useContext(AnimationConfigContext);
  if (!context) {
    throw new Error('useAnimationConfig must be used within an AnimationConfigProvider');
  }
  return context;
};

// Provider component
export const AnimationConfigProvider: FC<AnimationConfigProviderProps> = ({ children }) => {
  const [animationConfig, setAnimationConfig] = useState(defaultAnimationConfig);

  return (
    <AnimationConfigContext.Provider value={{ animationConfig, setAnimationConfig }}>
      {children}
    </AnimationConfigContext.Provider>
  );
};
