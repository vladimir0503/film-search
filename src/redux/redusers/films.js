const initialState = {
    films: [],
    filmInfo: null,
    trailers: [],
    isLoaded: false,
    id: null,
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

        case 'LOAD_FILM_INFO':
            return {
                ...state,
                filmInfo: action.payload
            }

        case 'LOAD_TRAILERS':
            return {
                ...state,
                trailers: action.payload
            }

        case 'GET_ID':
            return {
                ...state,
                id: action.payload
            }
        default:
            return state
    };
};

export default films