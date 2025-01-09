import { UsePageTransitions } from '../../hooks/UsePageTransitions.tsx';
import { useLocation } from 'react-router-dom';


function Navigation() {
  const handleNavigation = UsePageTransitions();
  const location = useLocation();

  // Helper to check if the given path is the current route
  const isActive = (path: string) => location.pathname === path;


  return (
    <nav style={{ display: 'flex', gap: '0.5rem', padding: '1rem', background: '#000', color: '#ffffff' }}>
      <button
        onClick={() => !isActive('/') && handleNavigation('/')}
        style={{
          background: 'none',
          color: 'white',
          border: 'none',
          pointerEvents: isActive('/') ? 'none' : 'auto', // Disable pointer events for active route
          cursor: isActive('/') ? 'default' : 'pointer', // Neutral cursor for non-interactive button
        }}
      >
        Homepage
      </button>
      <button
        onClick={() => !isActive('/ai') && handleNavigation('/ai')}
        style={{
          background: 'none',
          color: 'white',
          border: 'none',
          pointerEvents: isActive('/ai') ? 'none' : 'auto', // Disable pointer events for active route
          cursor: isActive('/ai') ? 'default' : 'pointer', // Neutral cursor for non-interactive button
        }}
      >
        DART AI
      </button>
    </nav>
  );
}

export default Navigation;
