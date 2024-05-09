import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation
import './Home.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Our App!</h1>
        <p>Please log in or create an account to continue.</p>
      </div>
      <div className="button-section">
        <Link to="/log-in">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
      <div>
      
      </div>
      <div className="about-section">
        <h1>About Us</h1>
        <p className="about-text">
          Respecting social norms, traditions, and cultures, the Working Group collaborates with stakeholders to provide practical recommendations to facilitate environmentally-safe, measurable, and cost-effective sustainable energy system technologies and solutions to enhance economic and social viability, standard of living, and quality of life of people living in developing communities
        </p>
      </div>
    </div>
  );
}

export default HomePage;
