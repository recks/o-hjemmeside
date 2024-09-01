import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import Page from './Page';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Blog from './Blog';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="/" element={<Blog />} />
          <Route path="/:pageId" element={ <Page /> } />
          </Route>
        </Routes>
    </HashRouter>
  </React.StrictMode>
);
