import React, {
	useRef,
	useState
} from 'react';

import JukeBox from './JukeBox';

import './App.css';
import box from './assets/images/box_office.png';
import {
	fadeIn,
	translateToCenter
} from './animations/animations';

function App() {
	const [playBso, setPlayBso] = useState(false);
	const [startTime] = useState(Date.now());
	const [time, setTime] = useState(0);

	const translatingBox = useRef();
	const fadingText = useRef();
	const fadingText2 = useRef();
	const iframe = useRef();

	const handleCompleteBoxAnimation = () => {
		fadeIn(fadingText.current, {
			callback: () => {
				fadeIn(fadingText2.current, {
					delay: 5
				});
			},
			duration: 5
		})
	};

	const handleMouseEnter = () => {
	};

	const toggleMusic = () => {
		if (playBso) {
			setTime(Date.now() - startTime);
		}
		setPlayBso(!playBso) ;
	};

	return (
		<div className="App" onMouseEnter={handleMouseEnter}>
			<header className="App-header">
				<h1>¡Lo conseguiste!</h1>
				<button onClick={toggleMusic}>
					{`${playBso ? 'Detener' : 'Reproducir'} música`}
				</button>
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
									onComplete: handleCompleteBoxAnimation
								});
							}}
						/>
					</div>
					{/* TEXT */}
					<div className="fading-texts">
						<p ref={fadingText}>Llevo tiempo planteándome una serie de cambios dentro de mi vida, y por diversos motivos, he decidido que...</p>
						<h1 ref={fadingText2}>Alcachofas con lacón{/*Me voy de Blink.*/}</h1>
					</div>
				</article>
			</div>
			<JukeBox
				src={`https://www.youtube.com/embed/OuaoxOVfHS4?autoplay=${+playBso}${time ? `&start=${Math.floor(time / 1000)}` : ''}`}
				ref={iframe}
			/>
		</div>
	);
}

export default App;
