const fetchData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'd5bf54f3',
            s: searchTerm
        }
    });

    if(response.data.Error) {
        return [];
    }

    return response.data.Search
};

const root = document.querySelector('.autocomplete');

root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input type="text" class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async e => {
    const movies = await fetchData(e.target.value);
    
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const movieOption = document.createElement('a');

        movieOption.classList.add('dropdown-item')
        movieOption.innerHTML = `
            <img src="${movie.Poster}" />
            ${movie.Title}
        `;

        resultsWrapper.appendChild(movieOption);
    }

};
input.addEventListener('input', debounce(onInput, 500));