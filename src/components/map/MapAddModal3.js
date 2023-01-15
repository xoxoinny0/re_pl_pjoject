import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useSelector, useDispatch } from "react-redux";

import { modalOpen1, modalOpen2, modalClose } from "../../slices/MapAddSlice";

export const MapAddModalContainer = styled.div`
  letter-spacing: -0.5px;
  color: #666666;
  line-height: 21.45px;
  position: relative;
  -webkit-font-smoothing: antialiased;

  .place_name {
    width: 100%;
    font-size: 24px;
    color: #0581bb;
    font-weight: 600;
    margin-top: 30px;
    word-break: keep-all;
    line-height: 160%;
    font-family: "S-CoreDream", "Spoqa Han Sans", Sans-serif;
  }

  .theme {
    b {
      font-weight: 600;
      line-height: 24.75px;
    }

    margin: 30px 0px 0px;
    font-size: 15px;
    color: #666;
    width: 100%;
  }

  .desc {
    font-size: 13px;
    color: #666666b3;
    margin-bottom: 20px;
  }

  .img_box {
    width: 100%;
    background-color: #e5e5e5;
    height: 160px;
    margin: 20px 0;
    line-height: 185%;
    font-size: 13px;
    color: #666666b3;
    font-family: "S-CoreDream", "Spoqa Han Sans", Sans-serif;
    padding-top: 50px;
    box-sizing: border-box;

    .icon {
      font-size: 28px;
      margin-bottom: 10px;
    }
  }

  .save {
    font-size: 14px;
    width: 100%;
    height: 50px;
    background-color: #0581bb;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 8px 0px;
    color: rgb(254, 254, 254);
    line-height: 50px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: #0575a9;
    }
  }

  .close {
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    height: 31.45px;
    line-height: 31.45px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #444;
    font-weight: 600;
  }
`;

const MapAddModal3 = memo(({ modalIsOpen, title }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState();

  const onRatingClick = useCallback((e) => {
    const current = e.currentTarget;
    const index = current.dataset.rating;
    console.log(+index + 1);
    setRating(index);

    document.getElementById("comment_text").focus();
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(modalClose())}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(50, 50, 50, 0.75)",
          zIndex: 99999,
        },
        content: {
          textAlign: "center",
          backgroundColor: "#F8F8F8",
          width: "290px",
          height: "fit-content",
          borderRadius: "15px",
          padding: "30px 30px 15px",
          margin: "auto",
          overflowY: "hidden",
          overscrollBehavior: "contain",
        },
      }}>
      <MapAddModalContainer>
        <div className="place_name">
          🙌
          <br />
          잠시만요!
        </div>
        <div className="theme">
          혹시, <b>{title}</b> 사진이 있으신가요?
        </div>
        <div className="img_box">
          <div className="no_image">
            <div className="icon">📷</div>
            <div>아직 이 장소에 등록된 사진이 없어요</div>
          </div>
        </div>
        <div className="desc">
          큐레이터님이 직접 찍은 사진을 올려주시면
          <br />
          진짜서울이 더 유익해 질 것 같아요!
        </div>

        <div className="save" onClick={() => dispatch(modalClose())}>
          사진 추가하기
        </div>
        <div className="close" onClick={() => dispatch(modalClose())}>
          종료하기
        </div>
      </MapAddModalContainer>
    </Modal>
  );
});

export default MapAddModal3;
