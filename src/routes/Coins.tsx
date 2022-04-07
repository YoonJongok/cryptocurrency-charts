import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  // const [coinList, setCoinList] = useState();
  // useEffect(() => {
  //   fetch();
  // }, []);

  return <Layout>{coins && coins.map((coin) => <h1>{coin.name}</h1>)}</Layout>;
}
export default Coins;
