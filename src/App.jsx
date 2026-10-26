import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const GiftCards = lazy(() => import('./pages/GiftCards'));
const Games = lazy(() => import('./pages/Games'));
const Community = lazy(() => import('./pages/Community'));
const Blog = lazy(() => import('./pages/Blog'));
const Guides = lazy(() => import('./pages/Guides'));
const Help = lazy(() => import('./pages/Help'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));

function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        color: 'var(--cyan)',
      }}
    >
      <i
        className="ti ti-loader"
        style={{ fontSize: '32px', animation: 'spin 1s linear infinite' }}
      ></i>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/inicio" element={<About />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/giftcards" element={<GiftCards />} />
            <Route path="/productos/juegos" element={<Games />} />
            <Route path="/comunidad" element={<Community />} />
            <Route path="/comunidad/blog" element={<Blog />} />
            <Route path="/comunidad/guias" element={<Guides />} />
            <Route path="/ayuda" element={<Help />} />
            <Route path="/ayuda/preguntas-frecuentes" element={<Faq />} />
            <Route path="/ayuda/contacto" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

