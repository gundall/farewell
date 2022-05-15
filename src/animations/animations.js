import { gsap } from 'gsap';

const checkValidTarget = (target) => {
    return target && target != null && (!Array.isArray(target) || target.length > 0);
}

const shake = (target, rotation, time, callback) => {
    if (!checkValidTarget(target))
        return;

    const finalTime = time && typeof time === "number" ? time : 0.1;
    const finalRotation = rotation && typeof rotation === "number" ? rotation : 1;
    const finalCallback = callback && typeof callback === "function" ? callback : () => {};

    gsap.to(target, {
        duration: finalTime,
        onComplete: (target) => {
            gsap.to(target, {
                duration: finalTime,
                onComplete: finalCallback,
                onCompleteParams: [target],
                repeat: 1,
                rotate: -finalRotation,
                yoyo: true
            });
        },
        onCompleteParams: [target],
        repeat: 1,
        rotate: finalRotation,
        yoyo: true
    });
};

const beat = (target, factor, time, repeats, callback) => {
    if (!checkValidTarget(target))
        return;

    const finalTime = time && typeof time === "number" ? time : 0.1;
    const finalFactor = factor && typeof factor === "number" ? factor : 1.2;
    const finalRepeats = repeats && typeof repeats === "number" ? repeats : 1;
    const finalCallback = callback && typeof callback === "function" ? callback : () => {};

    gsap.to(target, {
        duration: finalTime,
        onComplete: (target) => {
            gsap.to(target, {
                duration: finalTime,
                onCompleteParams: [target],
                onComplete: finalCallback,
                repeat: finalRepeats,
                scale: 1,
                yoyo: true
            });
        },
        onCompleteParams: [target],
        repeat: finalRepeats,
        scale: finalFactor,
        yoyo: true
    });
};

const beatOut = (target, factor, time, repeats, callback) => {
    if (!checkValidTarget(target))
        return;

    const finalTime = time && typeof time === "number" ? time : 0.1;
    const finalFactor = factor && typeof factor === "number" ? factor : 0.8;
    const finalRepeats = repeats && typeof repeats === "number" ? repeats : 1;
    const finalCallback = callback && typeof callback === "function" ? callback : () => {};

    gsap.to(target, {
        duration: finalTime,
        onComplete: (target) => {
            gsap.to(target, {
                duration: finalTime,
                onCompleteParams: [target],
                onComplete: finalCallback,
                repeat: finalRepeats,
                scale: 1,
                yoyo: true
            });
        },
        onCompleteParams: [target],
        repeat: finalRepeats,
        scale: finalFactor,
        yoyo: true
    });
};

const fadeIn = (target, data = {}) => {
    if (!checkValidTarget(target))
        return;

    const { callback, delay, duration } = data;

    const finalCallback = callback && typeof callback === "function" ? callback : () => {};
    const finalDelay = delay && typeof delay === "function" ? delay : 0;
    const finalDuration = duration && typeof duration === "number" ? duration : 1;

    gsap.set(target, { opacity: 0 });

    const Tween = gsap.to(target, {
        delay: finalDelay,
        duration: finalDuration,
        onComplete: finalCallback,
        onCompleteParams: [target],
        opacity: 1,
        repeat: 0
    });
    return Tween;
};

const fadeOut = (target, data = {}) => {
    if (!checkValidTarget(target))
        return;

    const { callback, delay, duration } = data;

    const finalCallback = callback && typeof callback === "function" ? callback : () => {};
    const finalDelay = delay && typeof delay === "function" ? delay : 0;
    const finalDuration = duration && typeof duration === "number" ? duration : 1;

    gsap.set(target, { opacity: 1 });

    const Tween = gsap.to(target, {
        delay: finalDelay,
        duration: finalDuration,
        repeat: 0,
        opacity: 0,
        onComplete: finalCallback,
        onCompleteParams: [target]
    });

    return Tween;
};

const bounce = (target, data = {}) => {
    if (!checkValidTarget(target))
        return;

    const { amount, callback, duration, ease, paused, repeat, yoyo } = data;

    const finalAmount = typeof amount !== "undefined" ? amount : 10;
    const finalEase = ease && typeof ease === "string" ? ease : 'none';
    const finalCallback = callback && typeof callback === "function" ? callback : () => {};
    const finalPaused = typeof paused !== "undefined" && paused;
    const finalRepeats = repeat && typeof repeat === "number" ? repeat : 3;
    const finalDuration = duration && typeof duration === "number" ? duration : 0.8;
    const finalYoyo = typeof yoyo !== "undefined" && yoyo;

    const Tween = gsap.to(target, {
        duration: finalDuration,
        ease: finalEase,
        onComplete: finalCallback,
        onCompleteParams: [target],
        paused: finalPaused,
        repeat: finalRepeats,
        y: finalAmount,
        yoyo: finalYoyo
    });

    return Tween;
};

const spin = (target, data = {}) => {
    if (!checkValidTarget(target))
        return;

    const { amount, callback, duration, ease, paused, repeat, yoyo } = data;

    const finalAmount = typeof amount !== "undefined" ? amount : 10;
    const finalEase = ease && typeof ease === "string" ? ease : 'none';
    const finalCallback = callback && typeof callback === "function" ? callback : () => {};
    const finalPaused = typeof paused !== "undefined" && paused;
    const finalRepeats = repeat && typeof repeat === "number" ? repeat : 3;
    const finalDuration = duration && typeof duration === "number" ? duration : 4;
    const finalYoyo = typeof yoyo !== "undefined" && yoyo;

    const Tween = gsap.to(target, {
        delay: 0,
        duration: finalDuration,
        ease: finalEase,
        onComplete: finalCallback,
        onCompleteParams: [target],
        paused: finalPaused,
        repeat: finalRepeats,
        rotation: finalAmount,
        yoyo: finalYoyo
    });

    return Tween;
};

const translateToCenter = (target, data = {}) => {
    const { onComplete, onStart, time } = data;
    const finalTime = time && typeof time === "number" ? time : 6;

    gsap.set(target, {
        left: `-${target.getBoundingClientRect().left + target.offsetWidth}px`
    });
    const Tween = gsap.to(target, {
        delay: 0,
        duration: finalTime,
        ease: 'power1.in',
        onComplete: (target) => {
            onComplete && onComplete(target);
            Tween.kill();
        },
        onCompleteParams: [target],
        onStartParams: [target],
        onStart: (target) => {
            onStart && onStart(target);
        },
        repeat: 0,
        x: (window.innerWidth + target.offsetWidth) / 2
    });

    return Tween;
}

const linearGrowShrink = (target, data = {}) => {
    const {amount, onComplete} = data;
    const Tween = gsap.to(target, {
        delay: 0,
        duration: 0.1,
        ease: 'linear',
        onComplete: (target) => {
            Tween.kill();
            onComplete && onComplete();
        },
        onCompleteParams: [target],
        repeat: 0,
        height: target.offsetHeight * (amount ?? 1)
    });

    return Tween;
}

// Función Ad-Hoc para la animación de EmptyList.
const tumble = (target, time, repeat, callback) => {
    if (!checkValidTarget(target))
        return;

    const finalTime = time && typeof time === "number" ? time : 15;
    const finalRepeats = repeat && typeof repeat === "number" ? repeat : 1;
    const finalCallback = callback && typeof callback === "function" ? callback : () => {};
    const referenceNode = target.parentNode;
    const targetDimensions = window.innerHeight > window.innerWidth
        ? window.innerWidth * 0.1
        : window.innerHeight * 0.1;


    gsap.set(target, {
        height: targetDimensions,
        width: targetDimensions
    });

    gsap.set(target, {
        bottom: `${window.innerHeight - (referenceNode.offsetHeight + referenceNode.offsetTop)}px`,
        left: `${-referenceNode.offsetLeft - target.offsetWidth}px`,
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
        display: 'block'
    });

    const bouncing = bounce(target, {
        amount: -15,
        ease: 'power1.out',
        paused: true,
        repeat: -1,
        yoyo: true
    });
    const spinning = spin(target, {
        amount: "+=360",
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})",
        paused: true,
        repeat: -1
    });

    const movement = gsap.to(target, {
        delay: 1,
        duration: finalTime,
        ease: 'linear',
        onComplete: (target) => {
            fadeOut(target);
            gsap.set(target, {
                display: 'none'
            });
            finalCallback(target);
            bouncing.kill();
            spinning.kill();
            movement.kill();
        },
        onCompleteParams: [target],
        onStart: () => {
            fadeIn(target);
            bouncing.resume();
            spinning.resume();
        },
        paused: true,
        repeat: finalRepeats,
        x: `+=${window.innerWidth + target.offsetWidth}`
    });

    function animationControls(action) {
        try {
            switch (action) {
                case "kill":
                    bouncing.kill();
                    movement.kill();
                    spinning.kill();
                    break;
                case "start":
                case "resume":
                    movement.resume();
                    break;
                default: // check active animations.
                    console.log('Active animations:');
                    console.log(bouncing);
                    console.log(movement);
                    console.log(spinning);
                    break;
            }
            console.log(`Success performing action: ${action}`);
        } catch(e) {
            throw new Error(e);
        }
    };

    return animationControls;
};

export {
    beat,
    beatOut,
    fadeIn,
    fadeOut,
    linearGrowShrink,
    shake,
    translateToCenter,
    tumble
};