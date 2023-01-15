import React, { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../slices/bulletin/BulletinSlice';

import Post from '../../components/bulletin/Post';

import postImg1 from '../../assets/img/bulletin/post_sample01.jpg';
import postImg2 from '../../assets/img/bulletin/post_sample02.jpg';
import postImg3 from '../../assets/img/bulletin/post_sample03.jpg';
import postImg4 from '../../assets/img/bulletin/post_sample04.jpg';
import postImg5 from '../../assets/img/bulletin/post_sample05.jpg';
import postImg6 from '../../assets/img/bulletin/post_sample06.jpg';

const BannerArea = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #39f;
  font-weight: 900;

  .banner__title {
    h1 {
      font-size: 40px;
      margin-bottom: 30px;
      font-weight: 900;
    }

    p {
      font-size: 20px;
      line-height: 1.5;
    }
  }

  .linksWrap {
    width: 1200px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  .links {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 5px;

    a {
      margin: 0 5px;
      padding: 6px 10px;
      background-color: #fff;
      text-decoration: none;
      color: #0581bb;
      border-radius: 12px;

      &:hover {
        background-color: #0581bb;
        color: #fff;
      }
    }
  }
`;

const MainArea = styled.section`
  width: 1200px;
  margin: auto;
  padding: 16px 32px;
  background-color: #fff;
  box-sizing: border-box;

  .main__option-bar {
    width: 100%;
    margin: auto;
    margin-bottom: 30px;

    select {
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      margin: 0 5px;
      padding: 5px;
      font-size: 12px;
    }
  }
`;

const PostList = styled.div`
  width: 100%;
  background-color: #fff;
  margin: auto;
  box-sizing: border-box;

  .list-box {
    width: 100%;  
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 30px;
  }
`;

const PageControl = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  a {
    display: inline-block;
    width: 8.3%;
    text-align: center;
    padding: 10px 5px;

    background-color: #fff;
    text-decoration: none;
    color: black;
    font-size: 16px;

    &:hover,
    .active {
      background-color: #ccc;
      color: white;
    }
  }
`;

const Bulletin = memo(() => {
    const { data, loading, error } = useSelector(state => state.BulletinSlice);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getList());
    }, []);

    return (
        <>
            <BannerArea>
              <div className="banner__title">
                    <h1>사람들의 서울 이야기</h1>
                    <p>게시글은 직접 리뷰를 남긴 장소를 대상으로 작성 가능해요.<br/>아래의 썸네일을 클릭해서 사람들의 취향과 개성이 담긴 이야기를 직접 읽어보세요.</p>
              </div>
              <div className="linksWrap">
                    <div className='links'>
                        <NavLink to='/bulletin/mypost/*'>- 내 게시글 -</NavLink>
                        <NavLink to='/bulletin/newpost/*'>- 글쓰기 -</NavLink>
                    </div>
              </div>
            </BannerArea>

            <MainArea>
                <div className='main__option-bar'>
                    <select name="align" id="align">
                        <option value="">인기순</option>
                        <option value="">최신순</option>
                    </select>
                    <select name="category" id="category">
                        <option value="">-- 카테고리를 선택하세요 --</option>
                    </select>
                    <select name="area" id="area">
                        <option value="">-- 지역을 선택하세요 --</option>
                    </select>
                </div>

                <PostList>
                    <div className='list-box'>
                        {
                            data && data.map((v, i) => {
                                    return (
                                        <Post
                                            key={i}
                                            targetId={v.id}
                                            postTitle={v.postTitle}
                                            backgroundImage={postImg1}
                                            postUser={v.postUser}
                                            like={v.like}
                                            postDate={v.postDate}
                                            selectedTags={v.selectedTags}
                                        />
                                    );
                            })
                        }
                    </div>

                    <PageControl>
                        <NavLink>&lt;</NavLink>
                        <NavLink to='/bulletin?page=1'>1</NavLink>
                        <NavLink to='/bulletin?page=2'>2</NavLink>
                        <NavLink to='/bulletin?page=3'>3</NavLink>
                        <NavLink to='/bulletin?page=4'>4</NavLink>
                        <NavLink to='/bulletin?page=5'>5</NavLink>
                        <NavLink to='/bulletin?page=6'>6</NavLink>
                        <NavLink to='/bulletin?page=7'>7</NavLink>
                        <NavLink to='/bulletin?page=8'>8</NavLink>
                        <NavLink to='/bulletin?page=9'>9</NavLink>
                        <NavLink to='/bulletin?page=10'>10</NavLink>
                        <NavLink>&gt;</NavLink>
                    </PageControl>
                </PostList>
            </MainArea>
        </>
    );
});

export default Bulletin;