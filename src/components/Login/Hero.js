import React from 'react';
import App from '../../App';

export default function Hero({handleLogout}) {
  return <section className='hero'>
      <nav>
          <button onClick={handleLogout}>Log Out</button>
      </nav>
  </section>;
}
