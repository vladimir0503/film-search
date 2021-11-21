import { api } from "../../api/api";

export const loadFilms = (films) => ({ type: 'LOAD_FILMS', payload: films });
export const loadFilmInfo = data => ({ type: 'LOAD_FILM_INFO', payload: data })
export const isLoaded = () => ({ type: 'LOADING' });
export const getFilmId = id => ({ type: 'GET_ID', payload: id });
export const loadTrailers = trailers => ({ type: 'LOAD_TRAILERS', payload: trailers })

export const getFilms = name => async dispatch => {
    dispatch(isLoaded());
    const films = await api.searchByName(name);
    dispatch(loadFilms(films));
};

export const getPremieresList = (year, month) => async dispatch => {
    dispatch(isLoaded());
    const films = await api.getPremieresList(year, month);
    dispatch(loadFilms(films));
};

export const getFilmInfo = id => async dispatch => {
    dispatch(getFilmId(id));
    const data = await api.getFilmInfo(id);
    dispatch(loadFilmInfo(data));
};

export const getTrailers = id => async dispatch => {
    const trailers = await api.getTrailers(id);
    dispatch(loadTrailers(trailers));
};