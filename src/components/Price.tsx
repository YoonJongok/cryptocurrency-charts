import { useEffect } from "react";
import styled from "styled-components";
import { PriceData } from "../routes/Coin";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const PriceBox = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  border: 2px solid ${(props) => props.theme.bgColor};
  border-radius: 10px;
  transition: 0.2s ease-in-out;
`;
const Item = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    border-right: 2px solid ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.bgColor};
    opacity: 0.7;
  }
`;
interface PriceProps {
  priceData: PriceData;
}
function Price({ priceData }: PriceProps) {
  const quoteData = {
    Price: priceData.quotes.USD.price,
    "Percentage within 1y": priceData.quotes.USD.percent_change_1y,
    "Percentage within 7d": priceData.quotes.USD.percent_change_7d,
    "Percentage within 12h": priceData.quotes.USD.percent_change_12h,
    "Percentage within 1h": priceData.quotes.USD.percent_change_1h,
  };

  return (
    <Container>
      {priceData &&
        Object.entries(quoteData).map((key, i) => {
          return (
            <PriceBox key={i}>
              <Item>
                <h3>{key[0]}</h3>
              </Item>
              <Item>
                <h3>{key[1]}</h3>
              </Item>
            </PriceBox>
          );
        })}
    </Container>
  );
}

export default Price;
