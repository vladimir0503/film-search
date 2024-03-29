import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getFilms } from '../redux/actions/films';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className='headerWrapper'>
            <div className='headerItems'>
                <Link to='/'>
                    <h1>ALL FILMS</h1>
                </Link>
                <Link to='/'>
                    <input
                        type='text'
                        placeholder='Введите название'
                        onChange={e => dispatch(getFilms(e.target.value))}>
                    </input>
                </Link>
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