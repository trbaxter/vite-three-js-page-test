import Navigation from './components/navigation/HandleNavigation';
import { Route, Routes } from 'react-router-dom';
import { BrainAnimation } from './components/brain-animation/BrainAnimation';
import { HomepageAnimation } from './components/homepage-animation/HomepageAnimation';
import { AnimationConfigProvider } from './components/homepage-animation/particles/config/AnimationConfigProvider';

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <AnimationConfigProvider>
              <HomepageAnimation />
            </AnimationConfigProvider>
          }
        />
        <Route path="/ai" element={<BrainAnimation />} />
      </Routes>
    </>
  );
}
