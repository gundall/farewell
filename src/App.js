import React, {
	useRef,
	useState
} from 'react';

import JukeBox from './JukeBox';
import MarkerButton from './MarkerButton';

import './App.css';
import {
	fadeIn,
	fadeOut,
	translateToCenter
} from './animations/animations';

import box from './assets/images/box_office.png';
import audioIcon from './assets/images/audio_icon.png';
import {
	texts
} from './config';

function App() {
	const [playBso, setPlayBso] = useState(false);
	const [startTime] = useState(Date.now());
	const [time, setTime] = useState(0);

	const translatingBox = useRef();
	const fadingText = useRef();
	const fadingText2 = useRef();
	const fadingText3 = useRef();
	const fadeOutSection1 = useRef();

	const handleCompleteBoxAnimation = () => {
		fadeIn(fadingText.current, {
			callback: () => {
				fadeOut(fadeOutSection1.current, {
					callback: () => {
						fadeOutSection1.current.style.display = 'none';
						fadeIn(fadingText2.current, {
							callback: () => {
								fadeIn(fadingText3.current, {
									delay: 5000
								})
							},
							delay: 7000
						});
					}
				});
			},
			duration: 3
		})
	};

	const handleMusicButtonClick = () => {
		setPlayBso(!playBso);
		playBso && setTime(Math.floor((Date.now() - startTime) / 1000));
	};

	return (
		<div className="App">
			<div id="markerButtons">
				<MarkerButton
					onClick={handleMusicButtonClick}
					tooltip={texts.music}
				>
					<img
						alt={texts.music}
						src={audioIcon}
					/>
				</MarkerButton>
			</div>

			<header className="App-header">
				<h1>¡Lo conseguiste!</h1>
			</header>

			<div id="pag-body">
				<article ref={fadeOutSection1}>
					<p>
						Y como lo prometido es deuda... te voy a revelar mi secreto.
					</p>
					{/* IMAGE */}
					<div className="img-container">
						<img
							alt="Office Box"
							ref={translatingBox}
							src={box}
							onLoad={() => {
								translateToCenter(translatingBox.current, {
									onComplete: handleCompleteBoxAnimation,
									time: 2
								});
							}}
						/>
					</div>
					<p className="fading-texts" ref={fadingText}>
						{texts.fadingText1}
					</p>
				</article>
				<article>
					{/* TEXT */}
					<div>
						<h1 className="fading-texts" ref={fadingText2}>{texts.fadingText2}</h1>
						<p className="fading-texts" ref={fadingText3}>
							{texts.fadingText3}
						</p>
					</div>
				</article>
			</div>
			<JukeBox
				src={`https://www.youtube.com/embed/OuaoxOVfHS4?start=${time}&autoplay=${playBso}`}
			/>
		</div>
	);
}

export default App;
