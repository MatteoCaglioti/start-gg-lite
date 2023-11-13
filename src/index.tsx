import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/main.scss';

const rootElement = document.getElementById('root')!;
const root = createRoot(
  rootElement,
);

root.render(<App />);
