import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import { loadFilmInfo } from '../redux/actions/films';

import InfoItem from '../components/InfoItem'
import Slider from '../components/Slider';
import Loader from '../components/Loader';
import Trailers from '../components/Trailers';
import FilmFacts from '../components/FilmFacts';

const FilmPage = React.memo(function FilmPage() {
    const { id, filmInfo, trailers } = useSelector(({ films }) => films);
    const dispatch = useDispatch();

    const itemArr = [
        {
            title: 'Страна',
            item: !filmInfo ? [] : filmInfo.countries[0].country
        },
        {
            title: 'Жанр',
            item: !filmInfo ? [] : filmInfo.genres
        },
        {
            title: 'Описание',
            item: !filmInfo ? [] : filmInfo.description
        },
        {
            title: 'Факты',
            item: !filmInfo ? [] : filmInfo.facts
        }
    ];

    React.useEffect(() => {
        return () => dispatch(loadFilmInfo(null));
    }, []);

    return (
        <div className='filmPage'>
            {!filmInfo ? <Loader />
                : (
                    <div className='filmBlock'>
                        <Slider />
                        <div className='infoWrapper'>
                            <img className='desctopPoster'
                                src={filmInfo.posterUrlPreview}
                                alt='poster'>
                            </img>
                            <div className='infoBlock'>
                                <div className='nameBlock'>
                                    <img className='mobilePoster'
                                        onClick={() => api.getFilmInfo(id)}
                                        src={filmInfo.posterUrlPreview}
                                        alt='poster'>
                                    </img>
                                    <div>
                                        <h1>{filmInfo.nameRu}</h1>
                                        <span><p>{`${filmInfo.nameOriginal} (${filmInfo.year})`}</p></span>
                                    </div>
                                </div>
                                {itemArr.map((item, index) => <InfoItem key={index} infoItem={item} i={index} />)}
                                <div className={`infoItem ${!filmInfo.items.length ? 'hide' : ''}`}>
                                    <h3>Факты</h3>
                                    <FilmFacts facts={filmInfo.items} />
                                </div>
                                <div className={`infoItem ${!trailers.length ? 'hide' : ''}`}>
                                    <h3>Трейлеры</h3>
                                    <Trailers />
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
});

export default FilmPage