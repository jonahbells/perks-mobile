import { useState, useEffect } from "react";
import axios from "axios";

export const fetchAllPerks = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://api.perksmania.com/${endpoint}`,
    headers: {},
    params: { ...query },
  };

  
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      // const data = await response.json();
      setData(response.data.rows);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};

export const fetchPerkById = (endpoint, query) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://api.perksmania.com/${endpoint}`,
    headers: {},
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      // const data = await response.json();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};