import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../slices/MainSlice";
import { setKeyword } from "../../slices/MapFinderSlice";
import { setActive } from "../../slices/SidebarSlice";
import { getTags } from "../../slices/bulletin/HashtagSlice";
import _ from  "lodash"; 

const SidebarContainer = styled.div`
  width: 33%;
  max-width: 520px;
  /* min-height: 100%; */
  height: 100vh;
  /* height: 100%; */

  background-color: #fefefe;
  padding: 40px 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  position: absolute;
  top: 0;
  bottom: 0;
  /* left: 0; */
  overflow-y: auto;
  -ms-overflow-style: none;
  z-index: 9999;
  left: -500px;
  transition: 0.5s;

  &.active {
    left: 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .search {
    margin-bottom: 20px;
    form {
      width: 100%;
      position: relative;
      .magnifyingGlass {
        background: #e5e5e5;
        cursor: pointer;
        width: 40px;
        border: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        line-height: 50px;
        margin-right: 10px;
      }
      input {
        width: 100%;
        background: #e5e5e5;
        color: #222222;
        border-radius: 8px;
        padding: 18px 16px 16px;
        box-sizing: border-box;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .filter {
    h3 {
      color: #0581bb;
      font-weight: 600;
      margin: 16px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        background-color: #f3f5f7;
        font-size: 13px;
        padding: 10px 11px 8px;
        margin: 5px 15px 5px 0;
        color: #444444;
        cursor: pointer;
        border-radius: 8px;
        &:hover {
          background-color: #e8e8e8;
        }
      }
      .more {
        background-color: #ddd;
        &:hover {
          background-color: #ddd;
        }
      }
      .active {
        color: #fefefe;
        background-color: #da4c1f;
      }
    }
  }
`;

const Sidebar = memo(() => {
  const { isActive } = useSelector((state) => state.SidebarSlice);
  const { keyword } = useSelector((state) => state.MapFinderSlice);
  const { filter } = useSelector((state) => state.MainSlice);
  const { data } = useSelector((state) => state.HashtagSlice);
  const [selectedItems, setSelectedItems] = useState({
    whereArr: null,
    whoArr: null,
    whatArr: null,
    featureArr: null,
    foodArr: null,
    drinkArr: null,
    categoryArr: null,
  });
  const [whereMoreView, setWhereMoreView] = useState(false);
  const [whatMoreView, setWhatMoreView] = useState(false);
  const [featureMoreView, setFeatureMoreView] = useState(false);
  
  const dispatch = useDispatch();

  const all = useRef();
  const theme = useRef();
  const following = useRef();

  const convData = data&&_.keyBy(data,'fieldName');

  useEffect(() => {
    switch (filter) {
      case 0:
        onAllClick();
        break;
      case 1:
        onThemeClick();
        break;
      default:
        onFollowingClick();
        break;
    }
  }, [filter]);

  useEffect(() => {
    dispatch((getTags()));
  },[]);


  const onFilterClick = useCallback((e, type) => {
    if (e.currentTarget === selectedItems[type]) {
      selectedItems[type].classList.remove("active");
      selectedItems[type] = null;
      return;
    }
    if (Object.values(selectedItems)?.filter((v) => v)?.length >= 3) {
      window.alert("??????????????? ?????? 3????????? ????????? ??? ????????????.");
      return;
    }
    if (selectedItems[type]) {
      selectedItems[type].classList.remove("active");
      selectedItems[type] = e.currentTarget;
      selectedItems[type].classList.add("active");
    } else {
      selectedItems[type] = e.currentTarget;
      selectedItems[type].classList.add("active");
    }
  });

  // console.log(selectedItems);

  const onSearchSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(setKeyword(e.target.search.value));
    dispatch(setActive(false));
    console.log(e.target.search.value);
  }, []);

  const onWhereMoreView = useCallback((Where) => {
    setWhereMoreView(true);
  });

  const onWhatMoreView = useCallback((Where) => {
    setWhatMoreView(true);
  });

  const onFeatureMoreView = useCallback((Where) => {
    setFeatureMoreView(true);
  });

  const onAllClick = useCallback((e) => {
    dispatch(setFilter(0));
    all.current.classList.add("active");
    theme.current.classList.remove("active");
    following.current.classList.remove("active");
  });

  const onThemeClick = useCallback((e) => {
    dispatch(setFilter(1));
    theme.current.classList.add("active");
    all.current.classList.remove("active");
    following.current.classList.remove("active");
  });

  const onFollowingClick = useCallback((e) => {
    dispatch(setFilter(2));
    following.current.classList.add("active");
    all.current.classList.remove("active");
    theme.current.classList.remove("active");
  });

  console.log(selectedItems);


  const more = useCallback((whereArr,length) => {
    if ( !length)
    {      
      length = convData&&(convData[whereArr].values.length || 0)

    }
    return convData&&convData[whereArr].values.map((v, i) => {
      return (
        <li key={i} onClick={(e) => onFilterClick(e, whereArr)}>
          <span>{v}</span>
        </li>
      );
    }).slice(0,length);
  }, [convData]);
  

  return (
    <SidebarContainer className={`${isActive ? "active" : ""}`}>
      <div className="search">
        <form onSubmit={onSearchSubmit}>
          <button type="submit" className="magnifyingGlass">
            ????
          </button>
          <input
            type="text"
            name="search"
            placeholder="???????????? ??????????????????."
            defaultValue={keyword}
          />
        </form>
      </div>
      <div className="filter map">
        <ul>
          <li onClick={onAllClick} ref={all}>
            ????????????
          </li>

          <li onClick={onThemeClick} ref={theme}>
            ????????????
          </li>
          <li onClick={onFollowingClick} ref={following}>
            ???????????????
          </li>
        </ul>
      </div>
      <div className="filter where">
        <h3>????????? ????????????????</h3>
        <ul>
          {convData&& whereMoreView === false ? more("whereArr" ,6) : more("whereArr")}
          {whereMoreView === false ? (
            <li onClick={onWhereMoreView} className="more">
              + ??? ??????
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="filter who">
        <h3>????????? ?????? ??????????</h3>
        <ul>
          {convData&&convData['whoArr'].values.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "whoArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter what">
        <h3>????????? ??????????</h3>
        <ul>
          {convData&&whatMoreView === false ? more("whatArr",6) : more("whatArr")}
          {whatMoreView === false ? (
            <li onClick={onWhatMoreView} className="more">
              + ??? ??????
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="filter feature">
        <h3>???????????? ??????</h3>
        <ul>
          {convData&&featureMoreView === false ? more("featureArr",6) : more("featureArr")}
          {featureMoreView === false ? (
            <li onClick={onFeatureMoreView} className="more">
              + ??? ??????
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="filter food">
        <h3>?????? ??????</h3>
        <ul>
          {convData&&convData['foodArr'].values.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "foodArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter drink">
        <h3>?????? ???/??????</h3>
        <ul>
          {convData&&convData['drinkArr'].values.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "drinkArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter category">
        <h3>????????????</h3>
        <ul>
          {convData&&convData['categoryArr'].values.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "categoryArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>

     
    </SidebarContainer>
  );
});

export default Sidebar;
