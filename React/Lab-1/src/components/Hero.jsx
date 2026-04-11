import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section py-5 d-flex align-items-center" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 order-2 order-md-1">
            <h1 className="display-2 fw-bold text-white mb-3">Katie Reed</h1>
            <h2 className="h3 text-white-50 mb-4">Web Developer  Designer</h2>
            <button className="btn btn-custom btn-lg">CONTACT ME</button>
          </div>
          <div className="col-md-6 order-1 order-md-2 mb-5 mb-md-0 text-center">
            <div className="hero-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                alt="Katie Reed"
                className="img-fluid rounded-4 shadow-lg grayscale"
                style={{ filter: 'grayscale(100%)', maxWidth: '400px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
