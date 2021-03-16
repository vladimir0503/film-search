import React from 'react'
import { useSelector } from 'react-redux';

import FilmCard from '../components/FilmCard';
import Loader from '../components/Loader';

const Home = () => {

    const { films, isLoaded } = useSelector(({ films }) => films);

    return (
        <div className='filmsWrapper'>
            {!isLoaded ? <Loader />
                : !films.length ? <h1>Начните что нибудь искать :)</h1>
                    : films.map((item, id) => <FilmCard key={id} film={item} />)}
        </div>
    );
};

export default Home