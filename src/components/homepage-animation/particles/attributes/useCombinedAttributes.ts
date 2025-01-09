import { useEffect, useState } from 'react';
import { CombinedAttributes } from './combinedAttributes';

export function UseCombinedAttributes() {
  const [particles, setParticles] = useState(CombinedAttributes());

  useEffect(() => {
    setParticles(CombinedAttributes()); // Regenerate attributes dynamically
  }, []);

  return particles;
}

