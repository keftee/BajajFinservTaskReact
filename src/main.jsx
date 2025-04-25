import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { DoctorProvider } from './DoctorContext'; // Import the DoctorProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the App component with the DoctorProvider */}
    <DoctorProvider>
      <App />
    </DoctorProvider>
  </StrictMode>,
);
