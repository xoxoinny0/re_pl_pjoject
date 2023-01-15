import React, { memo, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import iconPlus from "../assets/img/map/icon-plus-grey-sm.svg";

import breadSample from "../assets/img/bulletin/bread_sample.jpg";

export const LocModalContainer = styled.div`
  letter-spacing: -0.5px;
  color: #666666;
  line-height: 21.45px;

  .modal-header {
    padding: 0 0 20px;
    position: relative;
    h3 {
      color: #0581bb;
      font-weight: 900;
      font-size: 20px;
      margin-bottom: 6px;
    }

    span {
      font-size: 13px;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }

    .faX {
      font-size: 30px;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }

  .modal-body {
    height: 700px;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .modal-img-container {
      width: 700px;
      height: 160px;
      background-color: #e5e5e5;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 20px;
      border-radius: 10px;

      .icon {
        margin-bottom: 10px;
      }

      .text {
        font-size: 13px;
        font-weight: 400;
        line-height: 21.45px;
      }
    }

    .modal-info-container {
      display: flex;

      .info {
        width: 50%;
        padding-right: 20px;

        &:last-of-type {
          padding-right: 0;
          padding-left: 20px;
        }

        .info-item {
          margin-bottom: 30px;

          .theme-card {
            margin: 8px 0;
            font-size: 13px;
            width: 320px;
            height: 51.5px;
            padding: 15px 20px;
            box-sizing: border-box;
            box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
            border-radius: 12px;
          }

          .theme-card__about {
            transition: all 0.3s;

            &:hover {
              cursor: pointer;
              background-color: #eee;
            }
          }
        }

        .comment {
          display: flex;
          flex-flow: row wrap;

          .comment__emojies {
            input[type="radio"] {
              display: none;
            }
            label {
              display: inline-block;
              width: 50px;
              height: 50px;
              border-radius: 12px;
              margin: 0 16px 15px 0;
              box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
              line-height: 50px;
              text-align: center;

              &:hover {
                background-color: #eee;
                cursor: pointer;
                box-shadow: 1px 1px 3px rgb(0 0 0 / 40%);
                transition: all 0.4s;
              }

              &.active {
                background-color: #0581bb;
              }
            }
          }

          .comment__desc {
            margin-bottom: 20px;

            span {
              font-size: 12px;
              color: #aaa;
              display: inline-block;
              width: 50px;
              margin-right: 16px;
              letter-spacing: -1px;
              text-align: center;
              overflow-x: hidden;
            }
          }

          .comment__contents {
            max-height: 0px;
            overflow: hidden;
            transition: all 0.3s;

            .comment__input {
              width: 320px;
              resize: none;
              border: 2px solid #aaa;
              border-radius: 12px;
              padding: 20px;
              box-sizing: border-box;
              margin-bottom: 20px;

              ::placeholder {
                color: #bbb;
              }
            }
          }

          .comment__submit-button {
            width: 320px;
            height: 40px;
            border: none;
            border-radius: 12px;
            background-color: #ddd;
            color: #aaa;
            font-size: 12px;
            font-weight: 600;

            &.active {
              background-color: white;
              color: #000;
              box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
              transition: all 0.3s;

              &:hover {
                cursor: pointer;
                background-color: #ddd;
                box-shadow: 1px 1px 3px rgb(0 0 0 / 40%);
              }
            }
          }
        }
      }
    }

    .modal-bullet-container {
      .posts {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        padding-bottom: 10px;

        li {
          width: 23%;
          margin: 1%;
          height: 150px;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
          transition: all 0.2s;

          &:hover {
            cursor: pointer;
            scale: 0.98;
            box-shadow: 1px 1px 2px rgb(0 0 0 / 40%);
            filter: brightness(97%);
          }

          img {
            width: 100%;
            height: 60px;
            object-fit: cover;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }

          .posts_desc {
            h4 {
              padding: 0 5px 2px;
              text-overflow: ellipsis;
              font-size: 14px;
              font-weight: 600;
            }

            p {
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 10px;
              padding: 0 5px;
              line-height: 1.4;
            }
          }

          .posts_fb {
            text-align: right;
            padding: 0 10px 3px 0;
            font-size: 10px;
            font-weight: 600;

            span {
              margin-left: 2px;
            }
          }
        }
      }
    }
  }

  .modal-footer {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: 10px 0;

    button {
      border: none;
      border-radius: 12px;
      box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -1px;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        box-shadow: 1px 1px 3px rgb(0 0 0 / 40%);
      }
    }

    .forKakao {
      width: 90%;
      margin-right: 2%;
      background-color: #0581bb;
      color: #fff;

      &:hover {
        background-color: #045f8a;
      }
    }

    .scrap {
      width: 8%;
      aspect-ratio: 1 / 1;
      background-color: #fff;
      color: #0581bb;
    }
  }
`;

const testData = [
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
  {
    bgImg: breadSample,
    title: "예시 게시물",
    contents: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    hearts: 3,
  },
];

const LocModal = memo(({ modalIsOpen, onRequestClose, onClick, data, theme }) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      console.group("리뷰 모달창 열림 : " + data.place_name);
      console.log(data);
      console.groupEnd();
    }
  }, [modalIsOpen]);

  const onCommentRadioChange = useCallback((e) => {
    e.preventDefault();
    const current = e.currentTarget;

    current.children[0].checked = true;
    const targetArray = document.querySelectorAll("input[type=radio]");
    targetArray.forEach((v) => {
      if (v.checked === true) {
        v.closest("label").classList.add("active");
      } else {
        v.closest("label").classList.remove("active");
      }
    });

    document.querySelector(".comment__contents").style.maxHeight = "200px";
  }, []);

  const [commentContents, setCommentContents] = useState("");

  const onCommentContentsChange = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      setCommentContents((state) => value);
      if (commentContents !== "") {
        document.querySelector(".comment__submit-button").classList.add("active");
      } else {
        document.querySelector(".comment__submit-button").classList.remove("active");
      }
    },
    [commentContents]
  );

  const onCommentSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(50, 50, 50, 0.75)",
          zIndex: 99999,
        },
        content: {
          backgroundColor: "#F8F8F8",
          width: "700px",
          maxHeight: "1000px",
          height: "800px",
          left: "300px",
          borderRadius: "15px",
          padding: "40px 40px 50px",
          margin: "auto",
          overflowY: "hidden",
          overscrollBehavior: "contain",
        },
      }}>
      <LocModalContainer>
        <div className="modal-header">
          <h3>{data?.place_name}</h3>
          <span>{data?.road_address_name ? data?.road_address_name : data?.address_name}</span>
          <FontAwesomeIcon className="faX" icon={faX} onClick={onClick} />
        </div>
        <div className="modal-body">
          {/* 이미지 칸 */}
          <div className="modal-img-container">
            <div className="icon">
              <img src={iconPlus} alt="plusIcon" />
            </div>
            <div className="text">
              여기를 눌러서 장소와 관련된 사진을 올려주시면
              <br />
              페이지가 더 유익해 질 것 같아요!
            </div>
          </div>

          <div className="modal-info-container">
            {/* 왼쪽 줄 */}
            <div className="info">
              <div className="info-item">
                <div className="title">여기는 어떤 곳인가요?</div>
                {theme?.map((v, i) => {
                  return (
                    <div key={i} className="theme-card theme-card__about">
                      {v?.icon + " " + v?.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 오른쪽 줄 */}
            <div className="info">
              <div className="info-item">
                <div className="title">이 장소에 대한 후기들!</div>
                {data?.review?.map((v, i) => {
                  return (
                    <div key={i} className="theme-card">
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="info-item">
                <div className="title">직접 의견을 남겨보세요!</div>
                <form className="comment" onSubmit={onCommentSubmit}>
                  <div className="comment__emojies">
                    <label htmlFor="commentEmoji1" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji1" value="1" />
                    </label>
                    <label htmlFor="commentEmoji2" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji2" value="2" />
                    </label>
                    <label htmlFor="commentEmoji3" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji3" value="3" />
                    </label>
                    <label htmlFor="commentEmoji4" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji4" value="4" />
                    </label>
                    <label htmlFor="commentEmoji5" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji5" value="5" />
                    </label>
                    <label htmlFor="commentEmoji6" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji6" value="6" />
                    </label>
                    <label htmlFor="commentEmoji7" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji7" value="7" />
                    </label>
                    <label htmlFor="commentEmoji8" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji8" value="8" />
                    </label>
                    <label htmlFor="commentEmoji9" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji9" value="9" />
                    </label>
                    <label htmlFor="commentEmoji10" onClick={onCommentRadioChange}>
                      O
                      <input type="radio" name="commentEmoji" id="commentEmoji10" value="10" />
                    </label>
                  </div>
                  <div className="comment__desc">
                    <span>ㅠㅠ</span>
                    <span>...?</span>
                    <span>괜찮아요</span>
                    <span>좋았어요!</span>
                    <span>완벽해요!!</span>
                  </div>
                  <div className="comment__contents">
                    <textarea name="comment__input" className="comment__input" placeholder="여기에 의견을 입력해주세요" rows="5" onChange={onCommentContentsChange}></textarea>
                  </div>
                  <button type="submit" className="comment__submit-button">
                    저장하기
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-bullet-container">
            <div className="title">이 장소를 추천한 게시글 목록</div>
            <ul className="posts">
              {testData.map((v, i) => {
                return (
                  <li key={i}>
                    <img src={v.bgImg} alt="미리보기 이미지" />
                    <div className="posts_desc">
                      <h4>{v.title}</h4>
                      <p>{v.contents}</p>
                    </div>
                    <div className="posts_fb">
                      <p>
                        ♡<span>{v.hearts}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button className="forKakao">카카오맵으로 자세히 보기</button>
          <button className="scrap">O</button>
        </div>
      </LocModalContainer>
    </Modal>
  );
});

LocModal.defaultProps = {
  title: "장소이름 ???",
  address: "위치 ???",
};

export default LocModal;
