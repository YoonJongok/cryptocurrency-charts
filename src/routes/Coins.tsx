import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import Coin from "./Coin";

const Title = styled.header`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
`;
const CoinList = styled.ul`
  width: 100%;
  height: 85%;
  padding: 0.5rem 1rem;
  overflow: auto;
`;
const Card = styled.li`
  border: white 1px solid;
  border-radius: 15px;
  margin: 0 auto 10px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    transition: 0.2s ease-in;
    border-color: ${(props) => props.theme.accentColor};
    a {
      transition: 0.2s ease-in;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 0.5rem;
`;
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinInterface[]>();
  useEffect(() => {
    (async () => {
      const result = await fetch("https://api.coinpaprika.com/v1/coins").then(
        (res) => res.json()
      );
      setCoins(result.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Title>코인</Title>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <CoinList>
          {coins &&
            coins.map((coin) => (
              <Card key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Card>
            ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
