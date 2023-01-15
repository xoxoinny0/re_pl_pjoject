import React, { memo } from "react";
import styled from "styled-components";
import "animate.css";

const MapThemeBarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 70px;
  background-color: #fefefe;
  z-index: 1;
  padding: 8px 20px;
  box-sizing: border-box;
  height: 57.5px;
  font-size: 16px;
  line-height: 41.5px;
  border-radius: 12px 0 0 12px;
  box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
  font-weight: 600;
  transition: 2s;

  span {
    padding-right: 8px;
    margin-right: 8px;
    border-right: 3px solid #ccc;
  }
  a {
    text-decoration: none;
    color: #0581bb;
  }
`;

const MapThemeBar = memo(({ theme, ThemeData }) => {
  return (
    <MapThemeBarContainer className={`${"animate__animated"} ${"animate__fadeInRight"} ${"animate__faster"}`}>
      {theme && ThemeData && <span>{ThemeData[theme]?.icon + " " + ThemeData[theme]?.text}</span>}
      <a href="/map_finder">지도 찾기</a>
    </MapThemeBarContainer>
  );
});

export default MapThemeBar;
