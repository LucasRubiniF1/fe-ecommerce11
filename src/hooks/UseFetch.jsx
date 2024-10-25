import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                console.log('Response data:', response.data); // Agregar este log
                setData(response.data.products); // Asegúrate de que estás accediendo a la propiedad correcta
            } catch (err) {
                setError(err.response ? err.response.data : "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
