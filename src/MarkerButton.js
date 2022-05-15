import React from 'react';

import {
    linearGrowShrink
} from './animations/animations';

const MarkerButton = (props) => {
    const {children, onClick, tooltip} = props;

    const handleMouseEnter = (e) => {
        let shrinkTriggered = false;

        const shrinkCallback = (e) => {
            shrinkTriggered = true;
        };
        
        linearGrowShrink(e.currentTarget, {
            amount: 2,
            onComplete: (target) => {
                shrinkTriggered
                    ? linearGrowShrink(target, { amount: 0.5 })
                    : shrinkCallback();
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