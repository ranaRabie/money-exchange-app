import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (options: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options) {
      setIsLoading(true);
      (async function () {
        await axios
          .request(options)
          .then(function (response) {
            setResult(response.data);
            setIsLoading(false);
          })
          .catch(function (error) {
            setError(error);
            console.log(error.message);
            setIsLoading(false);
          });
      })();
    }
  }, [options]);

  return [isLoading, result, error];
};
