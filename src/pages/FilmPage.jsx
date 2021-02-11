import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import InfoItem from '../components/InfoItem'
import Slider from '../components/Slider';
import Loader from '../components/Loader';
import { initialSlider, changeSlidePosition, loadFrames } from '../redux/actions/slider';

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

let interval = null;

const FilmPage = React.memo(function FilmPage() {
    const [film, setFilm] = React.useState(null);
    const [trailerId, setTrailerId] = React.useState('');

    const { id } = useSelector(({ films }) => films);
    const { autoSlider, sliderCount, slidePosition, frames } = useSelector(({ slider }) => slider);

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

    const loadSlider = async (id) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`, { headers });
            const { frames } = await res.json();
            const framesArr = frames.filter((_, id) => id < 15);
            dispatch(loadFrames(framesArr));
        } catch (error) {
            dispatch(loadFrames([]));
        };
    };

    React.useEffect(() => {
        loadFilmInfo(id);
        loadTrailer(id);
        loadSlider(id);
        dispatch(loadFrames([]));
        dispatch(initialSlider(true));
        dispatch(changeSlidePosition());
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
                            count={sliderCount}
                            position={slidePosition}
                            frames={frames}
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
                                {itemArr.map((item, index) => <InfoItem key={index} infoItem={item} i={index} />)}
                                <div className='infoItem'>
                                    <Link to='/'><h4>Вернутся на главную</h4></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
});

export default FilmPage