import React from 'react';
import { marked } from 'marked';

const FilmFacts = ({ facts }) => {
    const [isOpen, setDetails] = React.useState(false);

    const handleClick = () => {
        setDetails(!isOpen)
    };

    return (
        <ul>
            <details onClick={handleClick}>
                <summary>{!isOpen ? 'Показать' : 'Скрыть'}</summary>
                {facts.map(fact => (<li dangerouslySetInnerHTML={{ __html: marked(fact.text) }} />))}
            </details>
        </ul>
    );
};

export default FilmFacts;