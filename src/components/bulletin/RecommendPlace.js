import React, { memo, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { getMyReview } from '../../slices/bulletin/RecommendPlaceSlice';

import Modal from 'react-modal';

import breadSample from '../../assets/img/bulletin/bread_sample.jpg';

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(50, 50, 50, 0.75)",
        zIndex: 99999,          
    },
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '500px',
        padding: '0',
        border: 'none',
    },
};

const PopUpBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;

    .closePopUp {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        font-size: 25px;
        
        &:hover {
            cursor: pointer;
            background-color: #ccc;
        }
    }

    .top-desc {
        margin-bottom: 15px;

        h3 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        p {
            font-size: 12px;
        }
    }

    .selected-place {
        width: 100%;
        margin: auto;
        min-height: 100px;
        background-color: #eee;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border-radius: 2px;

        p {
            font-size: 14px;
            display: inline-block;
            margin-right: 10px;
        }

        span {
            display: inline-block;
            background-color: #ccc;
            padding: 2px;
            margin: 0 10px 10px 0;
            border-radius: 3px;
            font-size: 12px;

            button {
                background: none;
                border: none;
                margin: 0 2px 0 2px;
                font-size: 10px;

                &:hover {
                    cursor: pointer;
                    font-weight: 600;
                }
            }
        }
    }

    .search {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 10px;
        
        * {
            line-height: 1.6;
            padding: 5px;
            border-radius: 2px;
            background-color: #eee;
            font-size: 12px;
        }

        div {
            flex: 1 1 auto;
            padding: 5px;
            margin-right: 5px;
            display: flex;
            flex-flow: row nowrap;

            input {
                flex: 1 1 auto;
                border: none;
                background: none;
            }
        }

        button {
            border: none;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .searched-list {
        width: 100%;
        max-height: 250px;
        box-sizing: border-box;
        padding-bottom: 15px;
        overflow-y: scroll;
        ::-webkit-scrollbar { 
            width: 4px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #777;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-track { 
            background: none;
        }

        li {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            display: flex;
            flex-flow: row nowrap;
            transition: all 0.2s;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }

            &.active {
                background-color: #0581bb;
                
                div {
                    h4, p { color: white; }
                }
            }

            img {
                width: 90px;
                height: 60px;
                object-fit: cover;
                margin-right: 20px;
            }

            div {
                display: flex;
                flex-flow: column wrap;
                justify-content: space-between;
                padding: 5px 0;
                padding-bottom: 10px;

                h4 {
                    color: skyblue;
                    font-weight: 600;
                    font-size: 18px;
                }

                p {
                    font-size: 14px;
                    color: darkgray;
                }
            }
        }
    }
`;

const RecommendPlace = memo(props => {
    /** slice ??????, ?????? ????????? ?????? ?????? ???????????? */
    /** To Do: ?????? ???????????? ??????. ?????? ?????? ??? ????????? */
    const { data: data_place, loading: loading_place, error: error_place } = useSelector(state => state.RecommendPlaceSlice);
    const dispatch = useDispatch();

    // ?????? ?????? ??? ?????? ????????? ????????????
    useEffect(() => {
        dispatch(getMyReview());
    }, []);

    /** ?????? ???????????? */
    // ?????? ?????? ?????? ??????
    const [selectedIndex, setSelectedIndex] = useState([]);
    // ?????? ?????? input data ??????
    const [keyword, setKeyword] = useState('');

    // ??? ?????? ?????? ?????? ????????? ?????? ??????
    useEffect(() => {
        if (data_place) setSelectedIndex(new Array(data_place.length).fill(false));
    }, [data_place]);

    // ????????? ?????????(?????????, ?????? ????????? ??????)
    const resetForm = useCallback(e => {
        e.preventDefault();
        const target =  e.currentTarget.closest('div').childNodes[0].childNodes[0];
        target.value = '';
        target.innerHTML = '';
        setKeyword(state => null);
    }, []);

    // ??? ?????? ????????? ???
    const onPlaceClick = useCallback(e => {
        e.preventDefault();

        // ????????? ?????? ????????? ???????????? state ?????? ?????? boolean ??????
        const idx = e.currentTarget.dataset.idx;
        setSelectedIndex(state => {
            let temp = [];
            for (const k of state) {
                temp.push(k);
            }
            temp[idx] = !temp[idx];
            return temp;
        });
    }, []);

    // ????????? ???????????? x ?????? ????????? ????????? ?????? ???
    const onDeletePlaceClick = useCallback(e => {
        e.preventDefault();

        const idx = e.currentTarget.closest('span').dataset.idx;
        setSelectedIndex(state => {
            let temp = [];
            for (const k of state) {
                temp.push(k);
            }
            temp[idx] = !temp[idx];
            return temp;
        });
    }, []);

    // ?????? ??????
    const onSearchPlace = useCallback(e => {
        e?.preventDefault();

        const value = document.querySelector('.search').childNodes[0].childNodes[0].value.trim();
        if (value === null || value ==='') {
            setKeyword(state => null);
            return;
        };

        setKeyword(state => value);
    }, []);

    useEffect(() => {
        // ????????? ?????? ?????? state??? set
        const items = [];
        for (let i = 0; i < selectedIndex.length; i++) {
            if (selectedIndex[i] === true) {
                items.push(data_place[i]);
            }
        }

        props.setSelectedPlaces(state => items);
    }, [selectedIndex]);

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={modalStyle}
            ariaHideApp={false}
        >
            <PopUpBox>
                <button className='closePopUp' onClick={props.closeModal}>X</button>
                <div className='top-desc'>
                    <h3>????????? ????????? ???????????????</h3>
                    <p>????????? ????????? ?????? ???????????? ?????? ????????????</p>
                </div>
                <div className='selected-place'>
                    <p>????????? ?????? ?????? : </p>
                    {
                        selectedIndex.map((v, i) => {
                            if (v === true) {
                                return (
                                    <span key={i} data-idx={i}>{data_place[i].place_name} <button onClick={onDeletePlaceClick}>X</button></span> 
                                )
                            } else return '';
                        })
                    }
                </div>
                <div className='search'>
                    <div>
                        <input type="text" name="keywordInput"
                            onKeyDown={e => {
                                if (e.key === 'Enter') onSearchPlace();
                            }}
                        ></input>
                        <button type='button' onClick={onSearchPlace}>
                            O ??????
                        </button>
                    </div>
                    <button type='button' onClick={resetForm}>?????????</button>
                </div>
                <ul className='searched-list'>
                    {
                        keyword ? (
                            data_place && data_place.map((v, i) => {
                                if (v.place_name.indexOf(keyword) !== -1) {
                                    return (
                                        <li key={i} data-idx={i} onClick={onPlaceClick} className={classNames({active: selectedIndex[i]})}>
                                            <img src={v?.place_img[0]} alt="?????? ??????" />
                                            <div>
                                                <h4>{v.place_name}</h4>
                                                <p>{v.address_name}</p>
                                            </div>
                                        </li>
                                    );
                                } else return '';
                            })
                        ) : (
                            data_place && data_place.map((v, i) => {
                                return (
                                    <li key={i} data-idx={i} onClick={onPlaceClick} className={classNames({active: selectedIndex[i]})}>
                                        <img src={v?.place_img[0]} alt="?????? ??????" />
                                        <div>
                                            <h4>{v.place_name}</h4>
                                            <p>{v.address_name}</p>
                                        </div>
                                    </li>
                                );
                            })
                        )
                    }
                </ul>
            </PopUpBox>
        </Modal>
    );
});

export default RecommendPlace;