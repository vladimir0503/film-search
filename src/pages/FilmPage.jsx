import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import InfoItem from '../components/InfoItem'
import Slider from '../components/Slider';
import Loader from '../components/Loader';
import { initialSlider } from '../redux/actions/initialSlider';

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

const FilmPage = () => {

    const [film, setFilm] = React.useState(null);
    const [trailerId, setTrailerId] = React.useState('');
    const [slidePos, setSlidePos] = React.useState('440px');

    const { id, autoSlider } = useSelector(state => state);

    const dispatch = useDispatch();

    const loadFilmInfo = async (id) => {
        const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, { headers });
        const { data } = await res.json();
        setFilm(data);
    };

    const loadTrailer = async (id) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/videos`, { headers });
            const { trailers } = await res.json();
            const trailerId = trailers[0].url.split('=').filter((_, id) => id === 1).join();
            setTrailerId(trailerId);
        } catch (error) {
            setTrailerId('');
            console.log(error);
        };
    };

    const changeSlidePosition = () => {
        const width = document.body.clientWidth;
        if (width <= 950 && width >= 360) {
            setSlidePos('340px');
        } else if (width <= 350) {
            setSlidePos('300px')
        };
        console.log('Размер окна', width);
    };

    React.useEffect(() => {
        loadFilmInfo(id);
        loadTrailer(id);
        dispatch(initialSlider(true));
    }, []);

    const itemArr = [
        {
            title: 'Страна',
            item: !film ? [] : film.countries[0].country
        },
        {
            title: 'Жанр',
            item: !film ? [] : film.genres
        },
        {
            title: 'Описание',
            item: !film ? [] : film.description
        },
        {
            title: 'Факты',
            item: !film ? [] : film.facts
        },
        {
            title: 'Трейлер',
            item: trailerId
        }
    ];



    return (

        <div className='filmPage'>
            {!film ? <Loader />
                : (
                    <div className='filmBlock'>
                        <Slider
                            id={id}
                            autoSliderInit={autoSlider}
                            changePosition={changeSlidePosition}
                            position={slidePos}
                        />
                        <div className='infoWrapper'>
                            <img className='desctopPoster'
                                src={film.posterUrlPreview}
                                alt='poster'>
                            </img>
                            <div className='infoBlock'>
                                <div className='nameBlock'>
                                    <img className='mobilePoster'
                                        src={film.posterUrlPreview}
                                        alt='poster'>
                                    </img>
                                    <div>
                                        <h1>{film.nameRu}</h1>
                                        <span><p>{`${film.nameEn} (${film.year})`}</p></span>
                                    </div>
                                </div>
                                {itemArr.map((item, index) => <InfoItem infoItem={item} i={index} />)}
                                <div className='infoItem'>
                                    <Link to='/'><h4>Вернутся на главную</h4></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default FilmPage
