import React from 'react';

const JukeBox = (props) => {
	const { src } = props;
	return (
		<iframe
			allow="autoplay; encrypted-media;"
			allowFullScreen
			autoPlay="1"
			frameBorder="0"
			height="315"
			id="bso"
			src={src}
			title="YouTube video player"
			width="560"
		/>
	);
};

export default JukeBox;