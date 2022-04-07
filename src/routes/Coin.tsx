import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0.5rem 0.6em;
  border-bottom: 2px solid black;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  p {
    margin-bottom: 0.4em;
    color: #ecf0f1;
    font-size: 1.1rem;
    opacity: 0.6;
  }
  h3 {
    font-size: 1.5rem;
  }
`;
const BackBtn = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.93);
    transform: scale(0.9);
  }
`;
const InfoBox = styled.div`
  padding: 0.5rem;
`;
interface RouterState {
  state: {
    name: string;
  };
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  const navigate = useNavigate();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(infoData);
      console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          <p>Name</p>
          <h3>{state.name}</h3>
        </Title>
        <BackBtn onClick={() => navigate(-1)}>&larr;</BackBtn>
      </Header>
      <InfoBox>Coin</InfoBox>
    </Container>
  );
}
export default Coin;
