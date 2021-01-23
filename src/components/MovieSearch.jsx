import React from 'react';

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

const MovieSearch = () => {

    const [name, setName] = React.useState('');

    const searchByName = async () => {
        const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}`, { headers });
        const { films } = await res.json();
        console.log(films);
    };

    // React.useEffect(() => {
    //     searchByName();
    // });

    return (
        <div>
            <input
                className=''
                placeholder='Введите название фильма'
                value={name}
                onChange={e => setName(e.target.value)}>
            </input>
        </div>
    );
}

export default MovieSearch
