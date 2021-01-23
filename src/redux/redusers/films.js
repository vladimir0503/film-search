import { createStore } from 'redux';

const initialState = {
    films: null,
    isLoaded: false,
    id: null,
    autoSlider: true
};

const films = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoaded: false
            }

        case 'LOAD_FILMS':
            return {
                ...state,
                films: action.payload,
                isLoaded: true
            }

        case 'GET_ID':
            return {
                ...state,
                id: action.payload
            }

        case 'INITIAL_SLIDER':
            return {
                ...state,
                autoSlider: action.payload
            }

        default:
            return state
    };
};

const store = createStore(films);

export default store;