import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section py-5 px-3" style={{ backgroundColor: '#111' }}>
      <div className="container">
        <div className="row g-4 justify-content-between align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <h4 className="text-white mb-4 text-uppercase fw-bold">Get In Touch</h4>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2"><i className="fas fa-envelope me-2 text-warning"></i> hello@katie.com</li>
              <li className="mb-2"><i className="fas fa-phone me-2 text-warning"></i> +1 234 567 890</li>
            </ul>
          </div>
          <div className="col-md-4 text-center">
            <button className="btn btn-outline-warning rounded-0 px-4 py-2 border-2">CONTACT ME</button>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <div className="social-icons mb-3">
              <a href="#" className="text-white me-3 h4"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white me-3 h4"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-3 h4"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-white h4"><i className="fab fa-github"></i></a>
            </div>
            <p className="small text-white-50 mb-0">Copyright &copy; 2024 Katie Reed. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
