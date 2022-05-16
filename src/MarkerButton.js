import React from 'react';

import {
    linearGrowShrink
} from './animations/animations';

const MarkerButton = (props) => {
    const {children, onClick, tooltip} = props;

    const shrinkCallback = (target) => {
        console.log('Pesezito');
        linearGrowShrink(target, { amount: 0.5 });
    };

    const handleMouseEnter = (e) => {
        linearGrowShrink(e.currentTarget, {
            amount: 2,
            onComplete: (target) => {
            }
        });

        e.currentTarget.addEventListener('mouseleave', shrinkCallback, { once: true });
    };

    return (
        <button
            className={'markerButton'}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            title={tooltip}
        >
            {children}
        </button>
    );
}

export default MarkerButton;

MarkerButton.defaultProps = {
    onClick: () => {}
};