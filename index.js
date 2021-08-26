const fetchData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'd5bf54f3',
            s: searchTerm
        }
    });

    return response.data.Search
};

const input = document.querySelector('input');

const onInput = async e => {
    const movies = await fetchData(e.target.value);
    console.log(movies);
};
input.addEventListener('input', debounce(onInput, 500));