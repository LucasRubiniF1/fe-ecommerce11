import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url, retryOnFailure = false, maxRetries = 3) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchData = useCallback(async (controller) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url, { signal: controller.signal });
            setData(response.data);
        } catch (err) {
            if (axios.isCancel(err)) return; // Ignore if request is canceled
            setError(err.message || 'Error fetching data');
            if (retryOnFailure && retryCount < maxRetries) {
                setRetryCount(prev => prev + 1);
            }
        } finally {
            setLoading(false);
        }
    }, [url, retryCount, retryOnFailure, maxRetries]);

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller);

        return () => controller.abort(); // Clean up by aborting request on unmount
    }, [fetchData]);

    const retryFetch = () => setRetryCount(0); // Reset retry count to re-trigger fetch

    return { data, loading, error, retryFetch };
};

export default useFetch;
