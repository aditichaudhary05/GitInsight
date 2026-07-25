import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './header-controls.css';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
