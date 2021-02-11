import React from 'react'

const InfoItem = React.memo(function InfoItem({ infoItem, i }) {
    const [spoilerInit, setSpoilerInit] = React.useState(false);

    const handleClick = () => {
        setSpoilerInit(!spoilerInit);
    };

    return (
        <div className={`infoItem ${(!infoItem.item || !infoItem.item.length) ? 'hide' : ''}`}>
            <h3>{infoItem.title}</h3>
            {
                i === 1 ? <ul>{infoItem.item.map((item, i) => <li key={i}>{item.genre}</li>)}</ul>
                    : i === 3 ? (
                        <details>
                            <summary onClick={handleClick}>
                                {!spoilerInit ? 'Показать' : 'Скрыть'}
                            </summary>
                            <ul>{infoItem.item.map((item, i) => <li key={i}>{item}</li>)}</ul>
                        </details>
                    )
                        : i === 4 ? (
                            <div className='trailerBlock'>
                                <iframe
                                    width="660"
                                    height="415"
                                    src={`https://www.youtube.com/embed/${infoItem.item}?&disablekb=0`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        )
                            : <p>{infoItem.item}</p>
            }
        </div>
    )
})

// const InfoItem = ({ infoItem, i }) => {

//     const [spoilerInit, setSpoilerInit] = React.useState(false);

//     const handleClick = () => {
//         setSpoilerInit(!spoilerInit);
//     };

//     return (
//         <div className={`infoItem ${(!infoItem.item || !infoItem.item.length) ? 'hide' : ''}`}>
//             <h3>{infoItem.title}</h3>
//             {
//                 i === 1 ? <ul>{infoItem.item.map((item, i) => <li key={i}>{item.genre}</li>)}</ul>
//                     : i === 3 ? (
//                         <details>
//                             <summary onClick={handleClick}>
//                                 {!spoilerInit ? 'Показать' : 'Скрыть'}
//                             </summary>
//                             <ul>{infoItem.item.map((item, i) => <li key={i}>{item}</li>)}</ul>
//                         </details>
//                     )
//                         : i === 4 ? (
//                             <div className='trailerBlock'>
//                                 <iframe
//                                     width="660"
//                                     height="415"
//                                     src={`https://www.youtube.com/embed/${infoItem.item}?&disablekb=0`}
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen>
//                                 </iframe>
//                             </div>
//                         )
//                             : <p>{infoItem.item}</p>
//             }
//         </div>
//     )
// };

export default InfoItem