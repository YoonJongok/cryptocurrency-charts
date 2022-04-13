import styled from "styled-components";
import { useQuery } from "react-query";

import { getCoinInfoById, getCoinPriceById } from "../api/coinApi";
import Chart from "../components/Chart";
import Container from "../components/Container";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Price from "../components/Price";

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
    text-transform: uppercase;
    font-size: 1.6rem;
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
  box-shadow: 0px 0px 2px 3px #000000;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.93);
    transform: scale(1.1);
  }
`;

const Description = styled.section`
  margin: 0.6em 0;
  padding: 0.5em 0.5rem 0.6em;
  p {
    margin-bottom: 0.5em;
    font-size: 0.9rem;
    opacity: 0.6;
    text-transform: uppercase;
  }
  h3 {
    font-size: 1.1rem;
  }
`;
const InfoBox = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  background-color: #121521;
  border-radius: 12px;
  div {
    padding: 0.4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    p {
      margin-bottom: 0.5em;
      font-size: 0.9rem;
      opacity: 0.6;
      text-transform: uppercase;
    }
    h3 {
      font-size: 1.2rem;
      text-transform: uppercase;
    }
  }
`;
const TabContainer = styled.section`
  height: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "a b";
  gap: 0.8rem;
  margin: 0.8em 0;
  text-align: center;
`;
const TabItem = styled.div<{ selected: boolean }>`
  transition: 0.2s ease-in-out;
  background-color: ${(props) =>
    props.selected ? props.theme.btnColor : "#121521"};
  border-radius: 12px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

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

export interface PriceData {
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
interface RouterState {
  name: string;
}
interface RouterParam {
  coinId: string;
}
function Coin() {
  const { coinId } = useParams<RouterParam>();
  const { state } = useLocation<RouterState>();

  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");
  const history = useHistory();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["coinInfo", coinId],
    () => getCoinInfoById(coinId as string)
  );

  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["priceInfo", coinId],
    () => getCoinPriceById(coinId as string)
  );

  return (
    <Container>
      {infoLoading || priceLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {infoData && priceData && (
            <>
              <Header>
                <Title>
                  <p>Name</p>
                  <h3>{infoData.name}</h3>
                </Title>
                <BackBtn onClick={() => history.push("/")}>&larr;</BackBtn>
              </Header>
              <Description>
                <p>Description:</p>
                <h3>{infoData.description}</h3>
              </Description>
              <InfoBox>
                <div>
                  <p>Rank:</p>
                  <h3>{infoData.rank}</h3>
                </div>
                <div>
                  <p>Symbol:</p>
                  <h3>{infoData.symbol}</h3>
                </div>
                <div>
                  <p>Price:</p>
                  <h3>${priceData.quotes.USD.price.toFixed(2)}</h3>
                </div>
              </InfoBox>
              <TabContainer>
                <TabItem selected={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>Chart</Link>
                </TabItem>
                <TabItem selected={priceMatch !== null}>
                  <Link to={`/${coinId}/price`}>Price</Link>
                </TabItem>
              </TabContainer>

              <Switch>
                <Route path={`/${coinId}/chart`}>
                  <Chart />
                </Route>
                <Route path={`/${coinId}/price`}>
                  <Price priceData={priceData} />
                </Route>
              </Switch>
            </>
          )}
        </>
      )}
    </Container>
  );
}
export default Coin;
