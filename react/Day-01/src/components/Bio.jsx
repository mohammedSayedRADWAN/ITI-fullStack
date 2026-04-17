import React from 'react';

const Bio = () => {
  return (
    <section className="bio-section py-5 bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="section-title text-white">About Me</h2>
            <p className="lead text-white-50 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <a href="#" className="btn btn-outline-light btn-lg px-5 border-2 rounded-0">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
