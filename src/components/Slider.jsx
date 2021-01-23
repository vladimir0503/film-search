import React from 'react';
import { useDispatch } from 'react-redux';

import { initialSlider } from '../redux/actions/initialSlider'

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

const Slider = ({ id, autoSliderInit }) => {

    const [slideArr, setSlideArr] = React.useState([]);
    const [slideCount, setSlideCount] = React.useState(1);

    let interval = null;

    const dispatch = useDispatch();

    const loadFrames = async (id) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`, { headers });
            const { frames } = await res.json();
            const framesArr = frames.filter((_, id) => id < 15);
            setSlideArr(framesArr);
        } catch {
            setSlideArr([]);
        };
    };

    const sliderItems = (url, index) => (
        {
            width: '950px',
            height: '440px',
            marginTop: `${index > 0 ? '-440px' : ''}`,
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            borderRadius: '3px',
            transition: '1.5s',
            position: 'relative',
            zIndex: index + 1,
            opacity: `${index === slideCount ? '100%' : '0'}`
        }
    );

    if (autoSliderInit && slideArr.length) {
        interval = setInterval(() => {
            setSlideCount(slideCount === slideArr.length - 1 ? 0 : slideCount + 1);
            clearInterval(interval);
        }, 3000);
    }

    const stopAutoSlider = () => {
        clearInterval(interval);
        dispatch(initialSlider(false));
    };

    const slideFoward = () => {
        stopAutoSlider();
        setSlideCount(slideCount === slideArr.length - 1 ? 0 : slideCount + 1);
    };

    const slideBack = () => {
        stopAutoSlider();
        setSlideCount(slideCount === 0 ? slideArr.length - 1 : slideCount - 1);
    };

    React.useEffect(() => {
        loadFrames(id);
    }, []);

    return (
        <div className='sliderWrapper'>
            <div className='sliderBlock'>
                {slideArr.length
                    ? slideArr.map((frame, id) => <div key={id} style={sliderItems(frame.image, id)}></div>)
                    : <img src='https://argamak-sher.uz/wp-content/uploads/no-image.png'></img>}
            </div>
            <div className={`sliderBtnBlock ${!slideArr.length ? 'hide' : ''}`}>
                <button onClick={slideBack}>
                    <svg
                        className="left"
                        width="50"
                        height="50"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="black"
                        />
                    </svg>
                </button>
                <button onClick={slideFoward}>
                    <svg
                        className="right"
                        width="50"
                        height="50"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="black"
                        />
                        <g></g>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Slider