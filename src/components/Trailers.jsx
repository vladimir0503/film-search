import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTrailers } from '../redux/actions/films';

const Trailers = () => {
    const { id, trailers } = useSelector(({ films }) => films);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTrailers(id));
    }, []);

    return (
        <div className='trailerBlock'>
            {trailers.map(id => (
                <iframe
                    width="660"
                    height="415"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            ))}
        </div>
    );
};

export default Trailers;