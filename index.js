const fetchData = async () => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'd5bf54f3',
            i: 'tt0468569'
        }
    });

    console.log(response.data);
};

fetchData();