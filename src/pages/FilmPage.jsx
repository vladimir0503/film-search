import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Slider from '../components/Slider';
import Loader from '../components/Loader';
import { initialSlider } from '../redux/actions/initialSlider';

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

function FilmPage() {

    const [film, setFilm] = React.useState(null);
    const [trailerId, setTrailerId] = React.useState('');
    const [spoilerInit, setSpoilerInit] = React.useState(false);

    const { id, autoSlider } = useSelector(state => state);

    const dispatch = useDispatch();

    const loadFilmInfo = async (id) => {
        const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, { headers });
        const { data } = await res.json();
        setFilm(data);
        console.log(data);
    };

    const loadTrailer = async (id) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/videos`, { headers });
            const { trailers } = await res.json();
            const trailerId = trailers[0].url.split('=').filter((_, id) => id === 1).join();
            setTrailerId(trailerId);
            console.log(trailers);
        } catch (error) {
            setTrailerId('');
            console.log(error)
        };
    };

    React.useEffect(() => {
        loadFilmInfo(id);
        loadTrailer(id);
        dispatch(initialSlider(true));
    }, []);

    console.log(film);

    return (

        <div className='filmPage'>
            {!film ? <Loader />
                : (
                    <div className='filmBlock'>
                        <Slider
                            id={id}
                            autoSliderInit={autoSlider}
                        />
                        <div className='infoWrapper'>
                            <img
                                src={film.posterUrlPreview}
                                alt='poster'>
                            </img>
                            <div className='infoBlock'>
                                <div className='infoItem'>
                                    <h1>{film.nameRu}</h1>
                                    <span><p>{`${film.nameEn} (${film.year})`}</p></span>
                                </div>
                                <div className='infoItem'>
                                    <h3>Страна</h3>
                                    <p>{film.countries[0].country}</p>
                                </div>
                                <div className='infoItem'>
                                    <h3>Жанр:</h3>
                                    <ul>{film.genres.map(i => <li>{i.genre}</li>)}</ul>
                                </div>
                                <div className='infoItem'>
                                    <h3>Описание:</h3>
                                    <p>{film.description}</p>
                                </div>
                                <div className={`infoItem ${!film.facts.length ? 'hide' : ''}`}>
                                    <h3>Факты:</h3>
                                    <details onClick={() => setSpoilerInit(!spoilerInit)}>
                                        <summary>{!spoilerInit ? 'Показать' : 'Скрыть'}</summary>
                                        <ul>{film.facts.map(i => <li>{i}</li>)}</ul>
                                    </details>
                                </div>
                                <div className='infoItem'>
                                    <h3>Трейлер:</h3>
                                    <div className='trailerBlock'>
                                        <iframe
                                            width="660"
                                            height="415"
                                            src={`https://www.youtube.com/embed/${trailerId}?&disablekb=0`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
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
