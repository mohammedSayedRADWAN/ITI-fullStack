import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <main className="portfolio-app">
      <Hero />
      <Bio />
      <hr className="m-0 border-secondary" />
      <Skills />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default App;
