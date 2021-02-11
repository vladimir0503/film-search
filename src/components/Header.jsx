import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loadFilms, isLoaded } from '../redux/actions/films'

// import { loadFilms } from '../redux/actions/loadFilms';
// import { isLoaded } from '../redux/actions/isLoaded';

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

const Header = () => {

    const [filmName, setFilmName] = React.useState('');
    const dispatch = useDispatch();

    const handleChange = (value) => {
        setFilmName(value)
    };

    const searchByName = async (name) => {
        dispatch(isLoaded());
        const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}`, { headers });
        const { films } = await res.json();
        dispatch(loadFilms(films));
    };

    React.useEffect(() => {
        searchByName(filmName);
    });

    return (
        <div className='headerWrapper'>
            <div className='headerItems'>
                <Link to='/'>
                    <h1>ALL FILMS</h1>
                </Link>
                <input
                    type='text'
                    placeholder='Введите название'
                    value={filmName}
                    onChange={e => handleChange(e.target.value)}>
                </input>
                <img src='https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-line-1/32/-_Magnifier-Search-Zoom--512.png'
                    alt='magnifier'
                    width='25px'
                    height='25px'>
                </img>
            </div>
        </div>
    );
};

export default Header;