import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
      background-color: white;
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

const testData = [
  {
    targetId: 1,
    postTitle: '게시물 1',
    img: postImg1,
    postUser: '게시자 1',
    like: 1,
    postDate: '2022-11-30',
    selectedTags: ['해시태그 1', '태그 2', '3']
  },{
    targetId: 2,
    postTitle: '게시물 2',
    img: postImg2,
    postUser: '게시자 2',
    like: 2,
    postDate: '2022-11-30',
    selectedTags: ['해시태그 1', '태그 2', '3']
  },{
    targetId: 3,
    postTitle: '게시물 3',
    img: postImg3,
    postUser: '게시자 3',
    like: 3,
    postDate: '2022-11-30',
    selectedTags: ['해시태그 1', '태그 2', '3']
  },{
    targetId: 4,
    postTitle: '게시물 4',
    img: postImg4,
    postUser: '게시자 4',
    like: 4,
    postDate: '2022-11-30',
    selectedTags: ['해시태그 1', '태그 2', '3']
  },{
    targetId: 5,
    postTitle: '게시물 5',
    img: postImg5,
    postUser: '게시자 5',
    like: 5,
    postDate: '2022-11-30',
    selectedTags: ['해시태그 1', '태그 2', '3']
  },
  {
    targetId: 6,
    postTitle: '게시물 6',
    img: postImg6,
    postUser: '게시자 6',
    like: 6,
    postDate: '2022-11-30',
    selectedTags: ['해시태그 1', '태그 2', '3']
  },
];

const MyPost = memo(() => {
    return (
        <>
            <BannerArea>
              <div className="banner__title">
                <h1>내 게시글</h1>
                <p>내가 직접 남긴 게시글들이에요.</p>
              </div>
              <div className="linksWrap">
                <div className='links'>
                  <NavLink to='/bulletin'>- 전체 게시글 -</NavLink>
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
                    testData.map((v, i) => {
                      return (
                        <Post
                          key={i}
                          targetId={v.targetId}
                          postTitle={v.postTitle}
                          backgroundImage={v.img}
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

export default MyPost;