const url = 'https://kinopoiskapiunofficial.tech';

const headers = {
    'X-API-KEY': '41bf77c1-b2b8-4711-b6b6-76cf890ced57',
};

const getTrailerId = (url) => {
    if (url.includes('=')) {
        return url.split('=').filter((_, id) => id === 1).join();
    } else {
        return url.split('').reverse().join('').split('/')[0].split('').reverse().join('');
    };
};

const searchByName = async name => {
    const res = await fetch(`${url}/api/v2.1/films/search-by-keyword?keyword=${name}`, { headers });
    const { films, searchFilmsCountResult } = await res.json();
    return ({ films, searchFilmsCountResult });
};

const getPremieresList = async (year, month) => {
    const res = await fetch(`${url}/api/v2.2/films/premieres?year=${year}&month=${month}`, { headers });
    const { items } = await res.json();
    return items;
};

const getFilmInfo = async id => {
    const resInfoItems = await fetch(`${url}/api/v2.2/films/${id}`, { headers });
    const data = await resInfoItems.json();

    const resFacts = await fetch(`${url}/api/v2.2/films/${id}/facts`, { headers });
    const { items } = await resFacts.json();
    return { ...data, items };
};

const getTrailers = async id => {
    const resTrailers = await fetch(`${url}/api/v2.2/films/${id}/videos`, { headers });
    const { items } = await resTrailers.json();
    const urlArr = items.filter(item => item.site === 'YOUTUBE').map(({ url }) => getTrailerId(url)).splice(0, 3);
    return urlArr;
};

const getFrames = async id => {
    const res = await fetch(`${url}/api/v2.1/films/${id}/frames`, { headers });
    const { frames } = await res.json();
    const framesArr = frames.filter((_, id) => id < 15);
    return framesArr;
};


export const api = {
    searchByName,
    getPremieresList,
    getFilmInfo,
    getTrailers,
    getFrames
};