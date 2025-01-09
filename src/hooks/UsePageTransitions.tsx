import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function UsePageTransitions() {
  const navigate = useNavigate();
  const isInitialLoadRef = useRef(true); // Use useRef to persist the value across renders

  useEffect(() => {
    const addRenderClass = setTimeout(() => {
      if (isInitialLoadRef.current) {
        // Initial fade-in effect
        document.body.classList.remove('fade-out');
        document.body.classList.add('render');
        isInitialLoadRef.current = false; // Ensure this runs only on the initial load
      }
    }, 60);

    return () => {
      clearTimeout(addRenderClass);
      document.body.classList.remove('render', 'fade-out');
    };
  }, []);

  return (path: string) => {
    document.body.classList.remove('render');
    document.body.classList.add('fade-out');

    const navigateAfterFade = () => {
      document.body.classList.remove('fade-out');
      navigate(path);
    };

    const timeout = setTimeout(navigateAfterFade, 1000);

    document.body.addEventListener(
      'transitionend',
      (e) => {
        if (e.propertyName === 'opacity') {
          clearTimeout(timeout);
          navigateAfterFade();
        }
      },
      { once: true }
    );
  };
}
