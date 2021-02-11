const initialState = {
    frames: [],
    autoSlider: true,
    sliderCount: 1,
    slidePosition: null,
};

const correctPosition = () => {
    const width = document.body.clientWidth;
    if (width <= 950 && width >= 360) {
        return '340px';
    } else if (width <= 350) {
        return '300px';
    };
    return '440px';
};

const slider = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_SLIDER':
            return {
                ...state,
                autoSlider: action.payload
            }

        case 'LOAD_FRAMES':
            return {
                ...state,
                frames: action.payload
            }

        case 'CHANGE_COUNTER':
            return {
                ...state,
                sliderCount: action.payload
            }

        case 'SLIDE_POSITION':
            return {
                ...state,
                slidePosition: correctPosition()
            }

        default:
            return state
    };
};

export default slider;