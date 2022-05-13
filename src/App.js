import React, {
  useRef
} from 'react';

import './App.css';
import box from './images/box_office.png';
import {
  fadeIn,
  translateToCenter
} from './animations/animations';

function App() {
  const translatingBox = useRef();
  const fadingText = useRef();
  const fadingText2 = useRef();

  const onCompleteBoxAnimation = () => {
    fadeIn(fadingText.current, {
      callback: () => {
        fadeIn(fadingText2.current, {
          delay: 5
        });
      },
      duration: 5
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        ¡Lo conseguiste!
      </header>
      <div id="pag-body">
        <p>
          Y como lo prometido es deuda... te voy a revelar mi secreto.
        </p>

        <article>
          {/* IMAGE */}
          <div className="img-container">
            <img
              alt="Office Box"
              ref={translatingBox}
              src={box}
              onLoad={() => {
                translateToCenter(translatingBox.current, {
                  onComplete: onCompleteBoxAnimation
                });
              }}
            />
          </div>
          {/* TEXT */}
          <div className="fading-texts">
            <p ref={fadingText}>Llevo tiempo planteándome una serie de cambios dentro de mi vida, y por diversos motivos, he decidido que...</p>
            <h1 ref={fadingText2}>Me voy de Blink.</h1>
          </div>
        </article>
      </div>
    </div>
  );
}

export default App;
