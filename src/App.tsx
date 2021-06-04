import React from 'react';
import './styles/style.scss';

function App() {
  return (
    <div className="main">
      <header>
        <h1>bniehuser.com</h1>
      </header>
      <section id={'body'}>
        <section id={'sidebar'}>
          <nav>
            <h3>Sections</h3>
            <ul>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
            </ul>
          </nav>
        </section>
        <section id={'content'}>
          This is the bniehuser.com site.  pretty boring.
        </section>
      </section>
    </div>
  );
}

export default App;
