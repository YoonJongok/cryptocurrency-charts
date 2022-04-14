import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkModeState } from "../atoms";

const Title = styled.header`
  height: 15%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  button {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 2rem;
    font-weight: 800;
    color: yellow;
    border: none;
    background-color: ${(props) => props.theme.boxColor};
    cursor: pointer;
    transform: rotate(-20deg);
    transition: 0.1s ease-in;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const CoinListContainer = styled.div`
  width: 100%;
  height: 85%;
  position: relative;

  div {
    left: 8px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
    visibility: hidden;
    position: absolute;
    &:hover,
    &:focus {
      visibility: visible;
    }
  }
`;
const CoinList = styled.ul`
  visibility: visible;
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
  const [isDark, setIsDark] = useRecoilState(darkModeState);
  useEffect(() => {
    (async () => {
      const result = await fetch("https://api.coinpaprika.com/v1/coins").then(
        (res) => res.json()
      );
      setCoins(result.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  const toggleDarkMode = () => setIsDark((current) => !current);

  return (
    <Container>
      <Title>
        코인
        <button onClick={toggleDarkMode}>
          {isDark ? <span>🌙</span> : <span>☀️</span>}
        </button>
      </Title>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <CoinListContainer>
          <div>
            <CoinList>
              {coins &&
                coins.map((coin) => (
                  <Card key={coin.id}>
                    <Link
                      to={{
                        pathname: `/${coin.id}`,
                      }}
                    >
                      <Img
                        src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                      />
                      {coin.name} &rarr;
                    </Link>
                  </Card>
                ))}
            </CoinList>
          </div>
        </CoinListContainer>
      )}
    </Container>
  );
}
export default Coins;
