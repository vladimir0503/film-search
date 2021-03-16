import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getId } from '../redux/actions/films';

const FilmCard = ({ film }) => {

    const dispatch = useDispatch();

    const handleCange = (id) => {
        dispatch(getId(id));
    };

    return (
        <div className='cardWrapper'>
            <h3 className='cardName'>{film.nameRu}</h3>
            <h4>{`(${film.year})`}</h4>
            <Link to='/filmPage'>
                <img
                    onClick={() => handleCange(film.filmId)}
                    className='cardImg'
                    alt='Poster'
                    src={film.posterUrlPreview}>
                </img>
            </Link>
        </div>
    );
};

export default FilmCard