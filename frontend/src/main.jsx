import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import './i18nExtra';
import './i18nLearn';
import './i18nMore';
import './i18nCompany';
import './i18nWeb';
import './i18nAssess';
import './i18nStep12';
import './i18nStep11';
import './i18nStep10';
import './i18nNames';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);