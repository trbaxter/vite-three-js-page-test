import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

// Add the "render" class to the body when the app is mounted
document.body.classList.add('render');

ReactDOM.createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);