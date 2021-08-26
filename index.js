const fetchData = async () => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'd5bf54f3',
            s: 'dark'
        }
    });

    console.log(response.data);
};

fetchData();