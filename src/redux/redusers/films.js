const initialState = {
    films: null,
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