export const loadFrames = (fr) => ({
    type: 'LOAD_FRAMES',
    payload: fr
});

export const initialSlider = (flag) => ({
    type: 'INITIAL_SLIDER',
    payload: flag,
});

export const changeCounter = (val) => ({
    type: 'CHANGE_COUNTER',
    payload: val
});

export const changeSlidePosition = () => ({
    type: 'SLIDE_POSITION'
});