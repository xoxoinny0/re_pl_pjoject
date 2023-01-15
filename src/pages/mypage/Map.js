import React, { memo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/mypage/PageContainer';
import PageInputBox from '../../components/mypage/PageInputBox';
import PageButton from '../../components/mypage/PageButton';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInfo } from '../../slices/InfoSlice';

const MyMapInputBox = styled.button`
    width: ${(props) => props.width || '350px'};
    height: ${(props) => props.height || '40px'};
    border-radius: 10px;
    box-shadow: 2px 2px 5px #DADADA;
    font-size: 13px;
    color: #0584BB;
    font-weight: bold;
    line-height: 2.5;
    padding: 0 10px;
    margin-bottom: 20px;
    cursor: pointer;
    border: none;
    background-color: white;

    .myMapIcon {
        font-size: 17px;
    }

    &:hover {
        box-shadow: 1px 2px 5px #a4a4a4;
        transition: all 0.2s;
    }
`

const MapBox = styled(PageContainer)`

    height: 100vh;
    
    h2 {
        padding-bottom: 100px;
    }

    

    .mapCon {
        display: flex;
        /* background-color: #eee; */
        justify-content: center;
        margin: 0 auto;
        
        h3 {
            margin-bottom: 30px;
            font-size: 17px;
            font-weight: bold;
            color: #424242;
        }

        p {
            margin-top : 30px;

            .b {
                font-weight: bold;
            }
            span {
                font-size: 13px;
                color: #606060;

            }
        }

        .mapButton {
            margin-top: 30px;
        }


        .theme {
            width: 330px;
            /* background-color: pink; */
            margin-right: 70px;

            
            
        }

        .curation {
            /* background-color: beige; */
            width: 330px;

            .curBox {
                margin-bottom: 30px;
            }
        }
    }

`

const Map = memo(() => {

    const navigate = useNavigate();
    
    //info data 가져오기
    const dispatch = useDispatch();
    const { data, loading, error} = useSelector((state) => state.InfoSlice);
    
    useEffect(()=> {
        dispatch(getInfo());
    }, [dispatch])
    
    //로그인된 id 데이터 가져오기
    const idData = data?.find((v, i) => v.id === 2)

    console.log("idData", idData);


    // 지도찾기로 이동하는 함수
    const onClickFindMap = useCallback((e)=> {
        let redirectUrl = '/map_finder';
        navigate(redirectUrl);
    }, [navigate])

    //내 테마지도로 이동하는 함수
    const onClickMyMap = useCallback((e)=> {
        let id = 2;
        let redirectUrl = `/map/curator/${id}`;
        navigate(redirectUrl);
    },[navigate])

    //큐레이션만들기 페이지로 이동
    const onCurationBtn = useCallback((e)=> {
        let redirectUrl = '/makeCu';
        navigate(redirectUrl);
    }, [navigate]);

    return (
        <MapBox>
            <h2>마이페이지 &gt; 나의 지도 관리</h2>
            <div className='mapCon'>
                <div className='theme'>
                    <h3>🗺 나의 테마지도 모아보기</h3>
                    <MyMapInputBox width={'300px'} height={'120px'} onClick={onClickMyMap}>
                        <div className='myMapIcon'>{idData?.icon}</div>
                        <div>
                            {`${idData?.eName}님의 리플`}
                        </div>
                    </MyMapInputBox>
                    <p>
                        <span className='b'>🕵️‍♂️ 여러분이 생각하는 최고의 장소들로 이루어진 지도를 만들어보세요.</span><br/>                          
                        <span>- 테마지도에 등록한 내 장소를 모아서 볼 수 있습니다.</span><br/>
                        <span>- 아래의 버튼을 클릭해서 테마를 둘러보고 큐레이션을 시작해보세요.</span><br/>                   
                        <span>- 원하는 테마를 직접 만들 수도 있습니다.</span><br/>
                        <span className='b'>🙋 ‘테마지도’와 ‘큐레이션 지도’는 어떻게 다른가요?<br/>
                        - 사용 설명서(링크)에서 쉽게 설명드릴게요.</span><br/>
                    </p>
                    <PageButton className='mapButton' width={'300px'} height={'44px'} onClick={onClickFindMap}>테마지도 보러가기</PageButton>
                </div>
                <div className='curation'>
                    <h3>🏕 나의 큐레이션 지도</h3>
                    <PageInputBox className='curBox' width={'300px'} height={'50px'}>
                    </PageInputBox>
                    <PageInputBox className='curBox' width={'300px'} height={'50px'}></PageInputBox>
                    <PageInputBox className='curBox' width={'300px'} height={'50px'}></PageInputBox>
                    <p>
                        <span className='b'>🕵️‍♂️ 나만의 지도를 만들어 장소를 마음껏 등록하고, 공유해보세요.</span><br/>
                        <span>- 하나의 지도에 장소를 마음껏 등록할 수 있습니다.</span><br/>
                        <span>- 등록된 장소들은 지도 설정값에 따라 진짜서울 웹사이트에 공유될 수 있습니다.</span><br/>
                    </p>
                    <PageButton className='mapButton' width={'300px'} height={'44px'} onClick={onCurationBtn}>큐레이션 지도 만들기</PageButton>
                </div>
            </div>
        </MapBox>
    );
});

export default Map;