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
    if(!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }
    
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const movieOption = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        movieOption.classList.add('dropdown-item')
        movieOption.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;

        resultsWrapper.appendChild(movieOption);
    }

};
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', e => {
    if(!root.contains(e.target)) {
        dropdown.classList.remove('is-active');
    }
});