import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../../common/Spinner';

import PageContainer from '../../components/mypage/PageContainer';
import PageInputBox from '../../components/mypage/PageInputBox';
import PageButton from '../../components/mypage/PageButton';

import { useSelector, useDispatch } from 'react-redux';
import { getInfo } from '../../slices/InfoSlice';

const InfoBox = styled(PageContainer)`
    
    h2 {
        
        padding-bottom: 40px;
    }

    p {
        padding: 15px 0;
    }

    .content {
        /* background-color: pink; */
        width: 500px;
        margin: 50px auto;
        display: flex;
        flex-direction: column;
        
        .name {
            margin: 0 auto;
        }

        .changeButton {
            margin-top: 30px;
            margin-left: 305px;
        }
    }

`

const Info = memo(() => {

    const dispatch = useDispatch();
    const { data, loading, error} = useSelector((state) => state.InfoSlice);
    
    useEffect(()=> {
        dispatch(getInfo());
    }, [dispatch])
    

    const idData = data?.find((v, i) => v.id === 2)

    console.log("idData", idData);

    return (
        
        <InfoBox>
            {/* <Spinner loading={loading} /> */}

            <h2>마이페이지 &gt; 내 정보 관리</h2>
            <div className='content'>
                <div className='name'>
                    <p>닉네임</p>
                    <PageInputBox>{idData?.eName}</PageInputBox>
                </div>
                <div className='name'>
                    <p>한 줄 소개</p>
                    <PageInputBox>{idData?.introduction}</PageInputBox>
                </div>
                <div className='name'>
                    <p>아이콘</p>
                    <PageInputBox>👩‍⚖️</PageInputBox>
                </div>
                <div className='name'>
                    <p>이메일</p>
                    <PageInputBox>{idData?.email}</PageInputBox>
                </div>
                <div className='name'>
                    <p>포인트</p>
                    <PageInputBox>{idData?.point}</PageInputBox>
                </div>

                <PageButton className='changeButton'>내 정보 변경하기</PageButton>
                
            </div>
        </InfoBox>
    );
});

export default Info;