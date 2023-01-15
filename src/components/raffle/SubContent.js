import React, { memo, useState } from "react";
import styled from "styled-components";
import { data } from "./data";
import img0 from "../../assets/img/raffle/tumbler.jpg";

const SubContentContainer = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: auto;
  margin-top: 10vh;
  text-align: center;

  img {
    width: 100%;
  }

  .content {
    display: inline-block;
    width: 25%;
    padding: 10px;
    box-sizing: border-box;

    background-color: #ddd;
    margin-bottom: 1vw;
  }
`;

const SubContent = memo(() => {
  return (
    <SubContentContainer>
      {data.map((v, i) => {
        return (
          <div key={i} className="content">
            <img src={img0} />
            <div>
              <span>{v.price}</span>
              <br />
              <span>{` ${v.remaining} /${v.total}`}</span>
            </div>
          </div>
        );
      })}
    </SubContentContainer>
  );
});

export default SubContent;
