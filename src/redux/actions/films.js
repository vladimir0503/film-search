export const loadFilms = (films) => ({
    type: 'LOAD_FILMS',
    payload: films,
});

export const isLoaded = () => ({
    type: 'LOADING'
});

export const getId = (id) => ({
    type: 'GET_ID',
    payload: id,
});