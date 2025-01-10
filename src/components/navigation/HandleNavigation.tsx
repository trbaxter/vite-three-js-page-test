import { UsePageTransitions } from '../../hooks/UsePageTransitions.tsx';
import { useLocation } from 'react-router-dom';


function Navigation() {
  const handleNavigation = UsePageTransitions();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{ display: 'flex', gap: '0.5rem', padding: '1rem', background: '#000', color: '#ffffff' }}>
      <button
        onClick={() => !isActive('/') && handleNavigation('/')}
        style={{
          background: 'none',
          color: 'white',
          border: 'none',
          pointerEvents: isActive('/') ? 'none' : 'auto',
          cursor: isActive('/') ? 'default' : 'pointer'
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
          pointerEvents: isActive('/ai') ? 'none' : 'auto',
          cursor: isActive('/ai') ? 'default' : 'pointer'
        }}
      >
        DART AI
      </button>
    </nav>
  );
}

export default Navigation;
