import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="page">

      <Navbar />

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            DNA PRECISION INTELLIGENCE SYSTEM
          </p>

          <h1>
            Decode DNA.
            <br />
            Understand Health Risks.
          </h1>

          <p className="hero-description">
            HelixMind is an AI-powered research prototype
            that analyzes supported genetic features and
            estimates disease-related risk using machine learning.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">
                Login
              </button>
            </Link>

          </div>

        </div>

        <div className="dna-symbol">
          🧬
        </div>

      </section>

      <section className="home-features">

        <h2>How HelixMind Works</h2>

        <div className="feature-grid">

          <div className="card">
            <h3>🧬 DNA Analysis</h3>
            <p>
              Process supported genetic data and
              extract features for analysis.
            </p>
          </div>

          <div className="card">
            <h3>🤖 AI Prediction</h3>
            <p>
              Machine learning models estimate
              disease-related risk.
            </p>
          </div>

          <div className="card">
            <h3>📊 Risk Insights</h3>
            <p>
              Understand model results using
              visual charts and feature importance.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;