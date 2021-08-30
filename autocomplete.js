const createAutoComplete = ({ root, renderOption }) => {
    root.innerHTML = `
        <label><b>Search for a Movie</b></label>
        <input type="text" class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

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

            movieOption.classList.add('dropdown-item')
            movieOption.innerHTML = renderOption(movie);

            movieOption.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = movie.Title;
                onMovieSelect(movie);
            });

            resultsWrapper.appendChild(movieOption);
        }

    };
    input.addEventListener('input', debounce(onInput, 500));

    document.addEventListener('click', e => {
        if(!root.contains(e.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};