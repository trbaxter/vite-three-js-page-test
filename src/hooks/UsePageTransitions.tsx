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
      document.body.classList.remove('render', 'fade-out'); // Cleanup classes
    };
  }, []);

  return (path: string) => {
    // Fade-out effect for page transitions
    document.body.classList.remove('render');
    document.body.classList.add('fade-out');

    const navigateAfterFade = () => {
      document.body.classList.remove('fade-out'); // Reset fade-out
      navigate(path); // Navigate to the target page
    };

    const timeout = setTimeout(navigateAfterFade, 1000); // Fallback timeout

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
