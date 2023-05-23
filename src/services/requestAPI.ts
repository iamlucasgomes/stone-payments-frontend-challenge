import axios from 'axios';

async function requestAPI() {
  const URL_BASE = 'https://economia.awesomeapi.com.br/json/last/';
  const COIN = 'USD-BRL';

  try {
    const url = `${URL_BASE}${COIN}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error('Error in data request.');
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default requestAPI;
