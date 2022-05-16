import React, {
	useEffect,
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
import audioMuteIcon from './assets/images/audio_muted_icon.png';
import watchAgainIcon from './assets/images/reload.png';
import musicIcon from './assets/images/music.png';

import {
	texts
} from './config';

function App() {
	const [playBso, setPlayBso] = useState(false);
	const [startTime] = useState(Date.now());
	const [time, setTime] = useState(0);
	const [lightsOn, setLightsOn] = useState(false);
	const [animationEnded, setAnimationEnded] = useState(false);

	const	translatingBox = useRef(),
			header = useRef(),
			fadingText0 = useRef(),
			fadingText = useRef(),
			fadingText2 = useRef(),
			fadingText3 = useRef(),
			fadingText4 = useRef(),
			fadeOutSection1 = useRef(),
			fadeOutSection2 = useRef(),
			finalSection = useRef(),
			lightsOff = useRef();

	const handleCompleteBoxAnimation = () => {
		fadeOutSection1.current.style.display = '';
		fadeIn(fadingText.current, {
			callback: function() {
				fadeOut(fadeOutSection1.current, {
					callback: function() {
						fadeOutSection1.current.style.display = 'none';
						fadeOutSection2.current.style.display = 'block';
						fadeIn(fadingText2.current, {
							callback: function() {
								fadeIn(fadingText3.current, {
									callback: function() {
										fadeIn(fadingText4.current, {
											callback: function() {
												fadeOut(fadeOutSection2.current, {
													callback: function() {
														fadeOutSection2.current.style.display = '';
														finalSection.current.style.display = 'block';
														fadeIn(finalSection.current, {
															callback: function() {
																setAnimationEnded(true);
																this.kill();
															}
														});
														this.kill();
													},
													delay: 12
												});
												this.kill();
											},
											delay: 8
										});
										this.kill();
									},
									delay: 2
								});
								this.kill();
							}
						});
						this.kill();
					},
					delay: 4
				});
				this.kill();
			},
			delay: 1,
			duration: 2
		})
	};

	const handleSwitchOn = () => {
		lightsOff.current.classList.add('on');
		setPlayBso(true);
		fadeOut(lightsOff.current, {
			callback: () => {
				setLightsOn(true);
			},
			delay: 2
		});
	};

	const handleMusicButtonClick = () => {
		setPlayBso(!playBso);
		playBso && setTime(Math.floor((Date.now() - startTime) / 1000));
	};

	const handleWhatImListening = () => {
		alert(texts.what_am_i_listening_text);
	};

	const handleWatchAgainClick = () => {
		window.location.reload();
	};

	useEffect(() => {
		if (!lightsOn)
			return;

		translateToCenter(translatingBox.current, {
			onComplete: handleCompleteBoxAnimation,
			onStart: (target) => {
				fadeIn(fadingText0.current);
				target.style.visibility = 'visible';
			},
			time: 2
		});
	}, [lightsOn]);

	return (
		<div className="App">
			{!lightsOn
				&& 	(
					<div
						id="lightsoff"
						ref={lightsOff}
					>
						<div>
							<h3>¡Aviso!</h3>
							<p>{texts.switchOnDisclaimer}</p>
							<img
								alt={texts.what_am_i_listening}
								src={musicIcon}
							/>
							<p>{texts.switchOnText}</p>
						</div>
						<button
							onClick={handleSwitchOn}
						/>
						<h2>{texts.switchOnHeader}</h2>
					</div>
				)
			}
			<div id="markerButtons">
				<MarkerButton
					id="music"
					onClick={handleMusicButtonClick}
					tooltip={texts[`music_${playBso ? 'stop' : 'stop'}`]}
				>
					<img
						alt={texts[`music_${playBso ? 'stop' : 'stop'}`]}
						src={playBso ? audioMuteIcon : audioIcon}
					/>
				</MarkerButton>
				{animationEnded
					&& (
						<MarkerButton
							id="replay"
							onClick={handleWatchAgainClick}
							tooltip={texts.watch_again}
						>
							<img
								alt={texts.watch_again}
								src={watchAgainIcon}
							/>
						</MarkerButton>
					)
				}
				<MarkerButton
					id="replay"
					onClick={handleWhatImListening}
					tooltip={texts.what_am_i_listening}
				>
					<img
						alt={texts.what_am_i_listening}
						src={musicIcon}
					/>
				</MarkerButton>
			</div>

			<header className="App-header">
				<h1 ref={header}>¡Lo conseguiste!</h1>
			</header>
			<div id="pag-body">
				<article ref={fadeOutSection1}>
					<p
						className="fading-texts"
						ref={fadingText0}
					>
						Y como lo prometido es deuda... te voy a revelar mi secreto.
					</p>
					{/* IMAGE */}
					<div className="img-container">
						<img
							alt="Office Box"
							ref={translatingBox}
							src={box}
						/>
					</div>
					<p
						className="fading-texts"
						ref={fadingText}
					>
						{texts.fadingText1}
					</p>
				</article>
				<article
					className="fading-texts-parent"
					ref={fadeOutSection2}
				>
					{/* TEXT */}
					<div>
						<h1
							className="fading-texts"
							ref={fadingText2}
						>
							{texts.fadingText2}
						</h1>
						<p
							className="fading-texts"
							ref={fadingText3}
						>
							{texts.fadingText3}
						</p>
						<p
							className="fading-texts"
							ref={fadingText4}
						>
							{texts.fadingText4}
						</p>
					</div>
				</article>
				<article
					className="fading-texts-parent"
					ref={finalSection}
				>
					<h2>{texts.endHeader}</h2>
					<p>{texts.endText}</p>
					<h2>{texts.endFarewell}</h2>
					<h3>{texts.endSign}</h3>
				</article>
			</div>
			<JukeBox
				src={`https://www.youtube.com/embed/OuaoxOVfHS4?start=${time}&autoplay=${playBso}`}
			/>
		</div>
	);
}

export default App;
