export async function getCoinInfoById(coinId: string) {
  const data = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
  return data.json();
}
export async function getCoinPriceById(coinId: string) {
  const data = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
  return data.json();
}
