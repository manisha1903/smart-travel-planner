import { useState, useEffect } from 'react';

// custom hook for fetching data from an API
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // dont fetch if no url given
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong. Status: ' + response.status);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
