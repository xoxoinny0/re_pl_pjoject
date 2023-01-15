import React, { memo, useState } from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { data } from "./data";
import img0 from "../../assets/img/raffle/tumbler.jpg";

const SliderContainer = styled.div`
  width: 70vw;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  color: black;

  .slick-dots {
    /* margin-bottom: 30px; */
  }

  .slick-arrow {
    &::before {
      color: gray;
      font-size: 30px;
    }
    &.slick-prev {
      left: -40px;
    }

    &.slick-next {
      right: -30px;
    }
  }

  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }

  .card {
    padding: 2%;
    box-sizing: border-box;
    height: 40vw;
    max-height: 400px;
    border: 1px solid gray;
    background: #eee;
    /* border-radius: 8px; */
    display: flex !important;

    .card-left {
      width: 60%;
      height: 100%;
      margin-right: 1%;

      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: black;
      }
    }

    .card-right {
      box-sizing: border-box;
      width: 40%;
      height: 100%;
      padding: 3% 3% 0;

      .card-right-top {
        height: 80%;
        /* background-color: wheat; */
        /* padding: 10%; */
        box-sizing: border-box;
        overflow: hidden;
        /* border-radius: 5px; */

        h1 {
          font-size: 2vw;
          font-weight: bold;
          margin-bottom: 10%;
          border-bottom: 1px solid gray;
          padding-bottom: 10%;
        }

        h3 {
          font-size: 16px;
          margin-bottom: 10%;
        }
        .category {
        }
      }

      .card-right-bottom {
        height: 20%;
        border-color: gray;
        button {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 5px;
          background-color: #feb84e;
          cursor: pointer;
        }
      }
    }
  }
`;

const ReactSlick = memo(() => {
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 3000,
    initialSlide: 0,
    componentDidMount() {
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2,
      });
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: img0,
    }));
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {data.map((item, i) => (
          <div key={i} className="card">
            <div className="card-left">
              <img src={defaultImage[item.title] === item.title ? defaultImage.linkDefault : item.linkImg} alt={item.title} onError={handleErrorImage} />
            </div>
            <div className="card-right">
              <div className="card-right-top">
                <h1>{item.title}</h1>
                <h3>{item.price}</h3>
                <h3>{item.odds}</h3>
                <span className="category">{`${item.total}개 중 ${item.remaining}개 남음`}</span>
              </div>
              <div className="card-right-bottom">
                <button>응모하기</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
});

export default ReactSlick;
