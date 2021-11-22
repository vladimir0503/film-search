import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getPremieresList } from '../redux/actions/films';

import FilmCard from '../components/FilmCard';
import Loader from '../components/Loader';

const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const Home = () => {
    const { films, isLoaded, filmsCount } = useSelector(({ films }) => films);
    const dispatch = useDispatch();

    React.useEffect(async () => {
        if (!films.length) {
            const year = new Date().getFullYear();
            const month = monthArr[new Date().getMonth()];
            dispatch(getPremieresList(year, month));
        };
    }, []);

    if (!filmsCount) {
        return <div className='filmsWrapper' >
            <h1>Ничего не найдено</h1>
        </div>
    };

    return (
        <div className='filmsWrapper'>
            {!isLoaded ? <Loader />
                : films.map((item, id) => <FilmCard key={id} film={item} />)}
        </div>
    );
};

export default Home;