import React, { memo } from "react";
import ReactSlick from "../../components/raffle/ReactSlick";
import styled from "styled-components";
import SubContent from "../../components/raffle/SubContent";

const RaffleContainer = styled.div`
  .remain-point {
    text-align: right;
    margin: 20px 40px 0 0;
  }
`;

const Raffle = memo(() => {
  return (
    <RaffleContainer>
      <p className="remain-point">장윤신님 현재 포인트: 300P</p>
      <ReactSlick />
      <br />
      <SubContent />
    </RaffleContainer>
  );
});

export default Raffle;
