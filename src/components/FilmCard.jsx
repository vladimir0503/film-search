import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getFilmInfo } from '../redux/actions/films';

const FilmCard = ({ film }) => {
    const dispatch = useDispatch();

    const handleChange = (id) => {
        dispatch(getFilmInfo(id));
    };

    return (
        <div className='cardWrapper'>
            <h3 className='cardName'>{film.nameRu}</h3>
            <h4>{`(${film.year})`}</h4>
            <Link to='/filmPage'>
                <img
                    onClick={() => handleChange(film.filmId || film.kinopoiskId)}
                    className='cardImg'
                    alt='Poster'
                    src={film.posterUrlPreview}>
                </img>
            </Link>
        </div>
    );
};

export default FilmCard;