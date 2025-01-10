import Navigation from './components/navigation/HandleNavigation.tsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BrainAnimation } from './components/brain-animation/BrainAnimation.tsx';
import { HomepageAnimation } from './components/homepage-animation/HomepageAnimation.tsx';
import { useEffect } from 'react';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const isInitialLoad = !document.body.classList.contains('render');

    if (isInitialLoad) {
      // Initial load: Ensure the fade-out state is visible
      document.body.classList.add('initializing');
      setTimeout(() => {
        document.body.classList.remove('fade-out', 'initializing');
        document.body.classList.add('render');
      }, 200);
    } else {

      document.body.classList.remove('render');
      setTimeout(() => {
        document.body.classList.add('render');
      }, 60);
    }
  }, [location]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomepageAnimation />} />
        <Route path="/ai" element={<BrainAnimation />} />
      </Routes>
    </>
  );
}


