import Navigation from './components/navigation/HandleNavigation.tsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BrainAnimation } from './components/brain-animation/BrainAnimation.tsx';
import { HomepageAnimation } from './components/homepage-animation/HomepageAnimation.tsx';
import { useEffect } from 'react';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const isInitialLoad = !document.body.classList.contains('render'); // Detect if this is the first load

    if (isInitialLoad) {
      // Initial load: Ensure the fade-out state is visible
      document.body.classList.add('initializing'); // Add a temporary class for better control
      setTimeout(() => {
        document.body.classList.remove('fade-out', 'initializing'); // Remove fade-out
        document.body.classList.add('render'); // Trigger fade-in
      }, 200); // Delay ensures the fade-out is rendered first
    } else {
      // Handle subsequent route transitions
      document.body.classList.remove('render'); // Start fade-out
      setTimeout(() => {
        document.body.classList.add('render'); // Trigger fade-in
      }, 60); // Short delay for navigation transitions
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


