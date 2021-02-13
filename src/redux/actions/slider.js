export const loadFrames = (fr) => ({
    type: 'LOAD_FRAMES',
    payload: fr
});

export const changeCounter = (val) => ({
    type: 'CHANGE_COUNTER',
    payload: val
});

export const changeSlidePosition = () => ({
    type: 'SLIDE_POSITION'
});