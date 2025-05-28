import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Reintroduce App
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './contexts/AppContext'; // Reintroduce AppProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

// const MinimalTestComponent = () => (
//   <div style={{ padding: '20px', textAlign: 'center', fontSize: '24px', backgroundColor: 'lightgray', height: '100vh' }}>
//     <h1>Hello World from Minimal Test!</h1>
//     <p>If you see this, basic React rendering is working.</p>
//   </div>
// );

root.render(
  <React.StrictMode>
    <AppProvider> { /* Wrap App with AppProvider */ }
      <App />
    </AppProvider>
    {/* <MinimalTestComponent /> */}
  </React.StrictMode>
);

reportWebVitals();

