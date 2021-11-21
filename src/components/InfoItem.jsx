import React from 'react';

const InfoItem = React.memo(function InfoItem({ infoItem, i }) {
    return (
        <div className={`infoItem ${(!infoItem.item || !infoItem.item.length) ? 'hide' : ''}`}>
            <h3>{infoItem.title}</h3>
            {
                i === 1 ? <ul>{infoItem.item.map((item, i) => <li key={i}>{item.genre}</li>)}</ul>
                    : <p>{infoItem.item}</p>
            }
        </div>
    )
});

export default InfoItem;