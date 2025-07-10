import axios from 'axios';

const API_KEY = '939e1271';
const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=939e1271';

export const searchMovieAvailability = async (term, country = 'us') => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { term, country },
      headers: {
        'x-rapidapi-key': 939e1271,
        'x-rapidapi-host': 'http://www.omdbapi.com/?i=tt3896198&apikey=939e1271',
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
