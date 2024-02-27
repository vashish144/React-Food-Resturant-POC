import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData || "SomeThing went Wrong Failed to send request");
  }
  return resData;
}

export default function useHttp(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  function clearData(){
    setData(initialValue);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went Wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config)
      sendRequest();
  }, [sendRequest, config]);
  return {
    error,
    isLoading,
    data,
    sendRequest,
    clearData
  };
}
