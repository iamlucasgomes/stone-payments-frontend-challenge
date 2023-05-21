async function requestAPI() {
  const URL_BASE = `https://economia.awesomeapi.com.br/json/last/`;
  const COIN = 'USD-BRL'
  try {
    const url = `${URL_BASE}${COIN}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error in data request.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export default requestAPI;
