import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="hero is-light">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1 has-text-centered">
            Cereal
          </h1>
          <p className="subtitle is-3 has-text-centered has-text-primary">
            The remote serial port communications terminal
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
