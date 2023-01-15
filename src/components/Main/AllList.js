import React, { memo, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getThemeData } from "../../slices/ThemeSlice";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";



const ThemeContainer = styled.div`
  margin-bottom: 30px;
  /* padding: 30px;
  box-sizing: border-box; */
  width: 60%;
  margin: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .link {
      display: block;
      text-decoration: none;
      width: 32%;
      /* flex: none; */
      margin-bottom: 30px;
      cursor: pointer;
    }
    li {
      background-color: #f8f8f8;
      text-align: center;
      text-decoration: none;
      border-radius: 12px;
      box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
      padding: 30px;
      box-sizing: border-box;
      height: 180px;

      .emoji {
        font-size: 30px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 15px;
        margin-bottom: 20px;
        color: #131017;
      }
      .desc {
        font-size: 12px;
        color : #666;
      }
    }
  }
`;

const AllList = memo(() => {
  const { data: data } = useSelector((state) => state.ThemeSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThemeData());
  },[]);

  const navigate = useNavigate();

  const onPageMove = useCallback((e) => {
    e.preventDefault();

    const {id} = e.currentTarget.dataset;
    
    navigate(`/map?theme=${id}`);

  },[]);

  return (
    <ThemeContainer>
      <ul>
        {/* 추후에 인피니티 스크롤 적용해야함 */}
        {data?.map(({ id, icon, text, user_number }, i) => {
          return (
            <div className="link" key={i} onClick={onPageMove} data-id={id} >
              <li>
                <div className="emoji">{icon}</div>
                <div className="title">{text}</div>
                <div className="desc">{user_number}명의 큐레이터</div>
              </li>
            </div>
          );
        })}
      </ul>
    </ThemeContainer>
  );
});

export default AllList;
