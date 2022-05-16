import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import PropTypes from 'prop-types';

import {
    linearGrowShrink
} from './animations/animations';

const MarkerButton = (props) => {
    const {id, children, onClick, tooltip} = props;
    const [mouseInside, setMouseInside] = useState();
    const [initialHeight, setInitialHeight] = useState();

    const btn = useRef();

    const handleMouseLeave = (e) => {
        setMouseInside(false);
    }
    const handleMouseEnter = (e) => {
        setMouseInside(true);
    };

    useEffect(() => {
        if (typeof mouseInside === "undefined")
            return;

        linearGrowShrink(btn.current, {
            amount: mouseInside ? 1.5 : 0.5,
            onStart: (target) => {
                typeof initialHeight === "undefined"
                    && setInitialHeight(target.offsetHeight);
            },
            value: initialHeight && initialHeight * (mouseInside ? 1.5 : 1)
        });
    });

    return (
        <button
            id={id}
            className={'markerButton'}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={btn}
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

MarkerButton.protoTypes = {
    id: PropTypes.string.isRequired
}