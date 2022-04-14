export async function fetchCoinInfoById(coinId: string) {
  const data = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
  return data.json();
}
export async function fetchCoinPriceById(coinId: string) {
  const data = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
  return data.json();
}

export async function fetchCoinHistory(coinId: string) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 7 * 24 * 60 * 60;
  return await fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`
  ).then((res) => res.json());
}
