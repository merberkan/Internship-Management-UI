import { useState, useEffect } from "react";

const useFetch = (url,method, body) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  // rerendering for every changing
  useEffect(() => {
    const abortCont = new AbortController(); // we use abort controller to stop the fetch

      fetch(url, { 
        signal: abortCont.signal,
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
       })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if(err.name === 'AbortError'){
            console.log('fetch aborted')
          }else{
            setIsPending(false);
            setError(err.message);
          }
        });
    //* cleans state for abort warnings while fetching for data
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
