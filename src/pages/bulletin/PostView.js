import React, { memo, useCallback, useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import Comments from '../../components/bulletin/Comments';
import OtherPost from '../../components/bulletin/OtherPost';
import RecommendListItem from '../../components/bulletin/RecommendListItem';
import Spinner from '../../common/Spinner';

import { getPost } from '../../slices/bulletin/PostViewSlice';
import { useSelector, useDispatch } from 'react-redux';

import breadSample from '../../assets/img/bulletin/bread_sample.jpg';
import { getCurrentData } from '../../slices/bulletin/BulletinSlice';

const TitleArea = styled.div`
    width: 100%;
    margin: auto;
    height: 400px;
    position: relative;
    background-color: ${props => props.bgColor};
    border-bottom: 1px solid #eee;

    .title {
        width: 500px;
        height: 150px;
        background-color: #00000022;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        box-sizing: border-box;
        padding: 10px;

        h2 {
            color: white;
            padding: 10px;
        }

        .title__main-title {
            width: 480px;
            height: 70px;
            font-size: 40px;
        }

        .title__desc {
            width: 100%;
            height: 40px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            h3 {
                color: white;
                font-size: 20px;
                padding: 10px;
            }
        }
    }
`;

const PostingArea = styled.section`
    width: 100%;
    padding: 20px;
    margin: auto;
    box-sizing: border-box;

    .postContent {
        width: 800px;
        margin: auto;
        padding: 50px 10px 100px;
        box-sizing: border-box;
        border-bottom: 1px solid #aaa;
        margin-bottom: 40px;
    }
`;

const RecommendPlaceArea = styled.div`
    width: 800px;
    margin: auto;
    margin-bottom: 40px;

    .recommend-place-top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;
        padding: 0 10px;

        h3 {
            font-size: 20px;
            font-weight: 600;
        }
    }

    .recommend-place-body {
        width: 100%;
        box-sizing: border-box;
    }
`;

const CategoryArea = styled.div`
    width: 800px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 20px;

    .category-tags {
        flex: 2 1 auto;

        span {
            display: inline-block;
            font-size: 12px;
            padding: 5px;
            border-radius: 5px;
            background-color: #eee;
            margin-right: 15px;
            margin-bottom: 10px;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }
        }
    }
`;

const PublisherDiv = styled.div`
    width: 800px;
    height: 50px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    background-color: #eee;
    margin-bottom: 50px;
    padding: 10px;
    justify-content: space-between;

    div {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;

        &:hover {
            cursor: pointer;
            filter: brightness(0.8);
        }
    }

    h2 {
        font-size: 24px;
        margin-left: 15px;
        font-weight: 600;

        &:hover {
            cursor: pointer;
        }
    }

    p {
        margin-right: 15px;
        font-size: 16px;

        span {
            font-size: 18px;
            margin-left: 5px;
        }
    }

    button {
        border: 1px solid #ccc;
        background-color: #fff;
        width: 100px;
        height: 40px;
        border-radius: 20px;
        color: skyblue;
        
        &:hover {
            cursor: pointer;
            background-color: #eee;
        }
    }
`;

const OtherPostsArea = styled.div`
    width: 800px;
    margin: auto;

    h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .other-posts {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        box-sizing: border-box;

        .other_posts__wrap {
            width: 800px;
            margin: auto;
            display: flex;
            flex-flow: row nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-behavior: smooth;
            
            ::-webkit-scrollbar {
                display: none;
            }
        }

        button {
            display: none;
            &.active {
                display: block;
            }

            width: 15px;
            height: 250px;
            border: none;
            background-color: #00000020;
            color: #fff;
            font-size: 25px;
            font-weight: 600;
            position: absolute;
            &:first-child {
                left: 5px;
            }
            &:last-child {
                right: 5px;
            }

            &:hover {
                cursor: pointer;
                background-color: #00000040;
            }
        }
    }
`;

const testData2 = [
    {
        profileImg: breadSample,
        writer: '작성자 1',
        writeDate: '2022-11-30',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        profileImg: breadSample,
        writer: '작성자 2',
        writeDate: '2022-11-30',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        profileImg: breadSample,
        writer: '작성자 3',
        writeDate: '2022-11-30',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
];

const testData3 = [
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
    {
        imgSrc: breadSample,
        title: '김밥',
        preview: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세'
    },
]

const NewPost = memo(props => {
    /** 게시글 데이터 불러오기 */
    const { data, loading, error } = useSelector(state => state.PostViewSlice);
    const dispatch = useDispatch();

    // 패스파라미터 변수
    const postId = useParams().id;
    // 해당 패스 게시글 불러오기
    useEffect(() => {
        dispatch(getPost({ id: postId }));
    }, [postId]);

    /** 작성자의 다른 게시글 영역 */
    // 현재 스크롤 위치 저장
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    // 왼쪽 오른쪽 버튼
    const toLeft = useRef();
    const toRight = useRef();

    // 최대 길이 적재
    useEffect(() => {
        if (!data) return;
        const target = document.querySelector('.other_posts__wrap');
        setMaxScroll(target.scrollWidth);
    }, [data]);

    // 좌 우 클릭
    const onToRightClick = useCallback(e => {
        e.preventDefault();
        e.currentTarget.setAttribute('disabled', 'disabled');
        const target = document.querySelector('.other_posts__wrap');
        target.scrollLeft += 780;
        setScrollPosition(state => state + 780);
        const current = e.currentTarget;
        setTimeout(() => {
            current.removeAttribute('disabled');
        }, 500);
    }, []);
    const onToLeftClick = useCallback(e => {
        e.preventDefault();
        e.currentTarget.setAttribute('disabled', 'disabled');
        const target = document.querySelector('.other_posts__wrap');
        target.scrollLeft -= 780;
        setScrollPosition(state => state - 780);
        const current = e.currentTarget;
        setTimeout(() => {
            current.removeAttribute('disabled');
        }, 500);
    }, []);

    return (
        <>  
            {
                loading ? (
                    <Spinner loading={loading} />
                ) : (
                    error ? (
                        <div>에러</div>
                    ) : (
                        data && <>
                            <TitleArea bgColor={data.bgColor}>
                                <div className='title'>
                                    <h2 className='title__main-title'>{data.postTitle}</h2>
                                    <div className='title__desc'>
                                        <h3>{data.postUser}</h3>
                                        <h3>{data.postDate}</h3>
                                    </div>
                                </div>
                            </TitleArea>

                            <hr />

                            <PostingArea>
                                <div className="postContent" dangerouslySetInnerHTML={{ __html: data.content}} />
                                <RecommendPlaceArea>
                                    <div className='recommend-place-top'>
                                        <h3>이 글에서 추천한 장소들</h3>
                                    </div>
                                    <div className='recommend-place-body'>
                                        <ul>
                                            {
                                                data.selectedPlaces && data.selectedPlaces.map((v, i) => {
                                                    return (
                                                        <RecommendListItem
                                                            key={i}
                                                            img={breadSample}
                                                            title={v.place_name}
                                                            address={v.address_name}
                                                            commend='3'
                                                            reaction={v.rating}
                                                            /** To Do: 댓글 개수(commend)랑 평점(v.rating) 둘 다 후기 릴레이션에서 가져와야 함 */
                                                        />
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                </RecommendPlaceArea>

                                <CategoryArea>
                                    <div className='category-tags'>
                                        {
                                            data.selectedTags && data.selectedTags.map((v, i) => {
                                                return (
                                                    <span key={i}>{v}</span>
                                                );
                                            })
                                        }
                                    </div>
                                </CategoryArea>

                                {/** To Do: 댓글 데이터 또한 각 게시글마다... 릴레이션 빼야한다는.. 하아 걍 게시글 데이터에 합쳐야하나? */}
                                <Comments data={testData2} />
                            </PostingArea>

                            <PublisherDiv>
                                <div>
                                    <img src={breadSample} alt="작성자 프로필" />
                                    <h2>작성자명</h2>
                                </div>
                                <div>
                                    <p>구독자<span>23</span></p>
                                    <button>구독하기</button>
                                </div>
                            </PublisherDiv>

                            <OtherPostsArea>
                                <h3>작성자의 다른 게시글</h3>
                                <div className="other-posts">
                                    <button className={classNames({active: scrollPosition > 0})} ref={toLeft} onClick={onToLeftClick}>&lt;</button>
                                    <div className='other_posts__wrap'>
                                        {
                                            /** To Do: 여기 또한 작성자 아이디 -> 게시글 테이블에서 해당 아이디 게시물들 얻어와서 뿌려야 함 */
                                            testData3.map((v, i) => {
                                                return (
                                                    <OtherPost key={i} imgSrc={v.imgSrc} title={v.title} preview={v.preview} />
                                                )
                                            })
                                        }
                                    </div>
                                    <button className={classNames({active: scrollPosition < maxScroll - 900})} ref={toRight} onClick={onToRightClick}>&gt;</button>
                                </div>
                            </OtherPostsArea>
                        </>
                    )
                )
            }
        </>
    );
});

export default NewPost;