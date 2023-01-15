import React, { memo } from 'react';
import styled from 'styled-components';

const Post = styled.div`
    min-width: 240px;
    height: 250px;
    background-color: #fff;
    margin: 0 10px;
    box-sizing: border-box;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
        border: 1px solid #eee;
    }

    img {
        width: 100%;
        aspect-ratio: 10 / 6;
        object-fit: cover;
        object-position: 50% 50%;
        margin-bottom: 5px;
    }

    h4 {
        font-size: 18px;
        padding: 5px;
    }

    p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical; 
        font-size: 12px;
        padding: 5px;
        line-height: 1.8;
    }
`

const OtherPost = memo(props => {
    return (
        <Post>
            <img src={props.imgSrc} alt="미리보기 사진" />
            <h4>{props.title}</h4>
            <p>{props.preview}</p>
        </Post>
    );
});

export default OtherPost;