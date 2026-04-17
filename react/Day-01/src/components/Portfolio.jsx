import React from 'react';

const PortfolioCard = ({ title, bgClass }) => (
  <div className="col-md-4 mb-4">
    <div className={`card h-100 card-dark rounded-0 border-0 p-5 d-flex align-items-center justify-content-center text-center`} style={{ minHeight: '200px', backgroundColor: bgClass === 'dark' ? '#333' : '#444' }}>
      <h4 className="text-white text-uppercase tracking-wider">{title}</h4>
      <div className="mt-3" style={{ height: '2px', width: '30px', backgroundColor: 'var(--accent-color)' }}></div>
    </div>
  </div>
);

const Portfolio = () => {
  const projects = [
    { title: 'Web Design', bgClass: 'dark' },
    { title: 'Mobile Design', bgClass: 'light' },
    { title: 'Logo Design', bgClass: 'dark' },
    { title: 'Web Development', bgClass: 'light' },
    { title: 'Mobile App', bgClass: 'dark' },
    { title: 'PWA Development', bgClass: 'light' }
  ];

  return (
    <section className="portfolio-section py-5 px-3">
      <div className="container">
        <h2 className="section-title text-white mb-5">Portfolio</h2>
        <div className="row">
          {projects.map((project, card) => (
            <PortfolioCard key={card} title={project.title} bgClass={project.bgClass} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
