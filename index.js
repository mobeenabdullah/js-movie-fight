const fetchData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'd5bf54f3',
            s: searchTerm
        }
    });

    console.log(response.data);
};

const input = document.querySelector('input');

const onInput = e => {
    fetchData(e.target.value);
};
input.addEventListener('input', debounce(onInput, 500));