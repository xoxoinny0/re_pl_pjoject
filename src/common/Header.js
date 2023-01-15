import React, { memo, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavActive } from "../slices/NavbarSlice";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "../components/login/LoginModal";

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  background-color: #0584bb;

  z-index: 999;

  .shadow {
    &.active {
      position: fixed;
      z-index: 990;
      width: 100%;
      /* height: 50px; */
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .navbarLogo {
    background-color: #0584bb;

    a {
      font-size: 25px;
      color: #fff;
    }
  }

  a {
    font-weight: bolder;

    text-decoration: none;
    /* color : #0584BB;     */
    color: #fff;
  }

  .navbarLogo {
    float: left;
    height: 50px;
    line-height: 50px;
    width: 100px;
    text-align: center;
  }

  .navbarMenu {
    float: right;
    .hamburger {
      font-size: 20px;
    }

    a {
      cursor: pointer;
      height: 50px;
      width: 100px;
      text-align: center;
      margin-left: 10px;
      display: inline-block;
      line-height: 50px;

      /* &:hover {
        color: #0584bb;
        background-color: #fff;
      } */

      &.Sidebar.active {
        background-color: #ccc;
      }
    }
  }
`;

const SidebarContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  z-index: 9999;
  width: 300px;
  background-color: rgb(248, 248, 248);
  height: 100%;
  position: fixed;
  /* top: 50px; */
  top: 0px;

  right: -300px;
  transition: 0.5s;

  &.active {
    right: 0;
  }

  .closeContainer {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    padding: 0 15px;
    box-sizing: border-box;
    min-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .exit {
      /* width: 20px;
      height: 20px; */
      color: #666;

    }
  }

  a {
    width: 80%;
    height: 50px;
    padding: 5px 0;
    box-sizing: border-box;
    display: block;
    text-align: left;
    font-size: 30px;
    font-weight: 500;
    line-height: 50px;
    color: #666;
    font-size: 15px;
    margin-bottom: 10px;

    &:nth-of-type(1) {
      margin-top : 60px;
    }

    &:nth-of-type(4) {
      margin-bottom: 160px;
    }

    &:hover {
      color: #000;
      font-weight: bolder;
    }

    /* &.active {
      background-color: rgba(20, 150, 150, 0.5);
    } */
  }
  
  hr {
    color: #ccc;
    border-width: 0.3px 0 0 0;

  }
`;

const Header = memo(() => {
  const SidebarCon = useRef();
  const [sideActive, SetSideActive] = useState(false);

  //로그인 모달 상태관리
  const [LMDIsOpen, setLMDIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { navActive } = useSelector((state) => state.SidebarSlice);

  const { isActive } = useSelector((state) => state.SidebarSlice);

  const onSidebarClick = useCallback((e) => {
    e.preventDefault();
    SetSideActive(!sideActive);
    dispatch(setNavActive(true));
  });

  const handleClose = useCallback((e) => {
    if (sideActive) {
      SetSideActive(false);
    }
  });

  // 로그인 누르면 모달창 변수 변경
  const handleLoginModal = useCallback((e) => {
    e.preventDefault();
    setLMDIsOpen(true);
  });
  return (
    <HeaderContainer>
      <div
        className={`shadow ${isActive || sideActive ? "active" : ""}`}
        onClick={handleClose}
      ></div>

      <div className="navbarLogo">
        <NavLink to="/">리플</NavLink>
      </div>
      <div className="navbarMenu">
        <a onClick={handleLoginModal}>로그인</a>
        <a
          onClick={onSidebarClick}
          className={`Sidebar ${sideActive ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faBars} className="hamburger" />
        </a>
      </div>

      <SidebarContainer
        ref={SidebarCon}
        className={`${sideActive ? "active" : ""}`}
      >
        <div className="closeContainer" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} className="exit" size="1x"/>
        </div>
        <NavLink to="/">🏠 홈으로</NavLink>
        <NavLink to="/map_finder">🗺 지도찾기</NavLink>
        <hr />
        <NavLink to="/mypage">🧒 마이페이지</NavLink>
        <NavLink to="!#">👋 로그아웃</NavLink>
        <NavLink to="/bulletin">📌 게시판</NavLink>
        <NavLink to="/raffle">🎉 경품페이지</NavLink>
        <NavLink to="!#">💬 의견 및 오류제보</NavLink>
        <NavLink to="!#">📝 사용 설명서</NavLink>
      </SidebarContainer>

      {/* 로그인 모달창 */}
      {LMDIsOpen && <LoginModal LMDIsOpen={LMDIsOpen} onRequestClose={() => setLMDIsOpen(false)}/>}
    
    </HeaderContainer>
  );
});

export default Header;
