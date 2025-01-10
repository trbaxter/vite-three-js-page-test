import Navigation from './components/navigation/HandleNavigation.tsx';
import { Route, Routes } from 'react-router-dom';
import { BrainAnimation } from './components/brain-animation/BrainAnimation.tsx';
import { HomepageAnimation } from './components/homepage-animation/HomepageAnimation.tsx';

export default function App() {

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


