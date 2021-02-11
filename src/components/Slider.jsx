import React from 'react';
import { useDispatch } from 'react-redux';

import { changeCounter } from '../redux/actions/slider';

let interval = null;

const Slider = ({ count, position, frames }) => {

    let intervalCount = 0;

    const dispatch = useDispatch();

    const slideFoward = () => {
        clearInterval(interval);
        dispatch(changeCounter(count === frames.length - 1 ? 0 : ++count));
    };

    const slideBack = () => {
        clearInterval(interval);
        dispatch(changeCounter(count === 0 ? frames.length - 1 : --count));
    };

    const autoSlider = () => {
        if (intervalCount === frames.length - 1) {
            intervalCount = 0;
            dispatch(changeCounter(0));
        } else {
            ++intervalCount;
            dispatch(changeCounter(intervalCount));
        };
    };

    const slideStyles = (index) => (
        {
            margin: '0 auto',
            display: 'block',
            marginTop: `${index > 0 ? `-${position}` : ''}`,
            borderRadius: '3px',
            transition: '1.5s',
            zIndex: index + 1,
            opacity: `${index === count ? '100%' : '0'}`
        }
    );

    React.useEffect(() => {
        dispatch(changeCounter(0));
        interval = setInterval(() => autoSlider(), 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='sliderWrapper'>
            <div className='sliderBlock'>
                {frames.length
                    ? frames.map((frame, id) => <img key={id} src={frame.image} style={slideStyles(id)} />)
                    : <img src='https://argamak-sher.uz/wp-content/uploads/no-image.png'></img>}
            </div>
            <div className={`sliderBtnBlock ${!frames.length ? 'hide' : ''}`}>
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
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Slider