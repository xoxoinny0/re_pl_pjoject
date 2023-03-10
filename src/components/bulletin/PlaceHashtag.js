import React, { memo, useEffect, useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { getTags } from '../../slices/bulletin/HashtagSlice';

import Modal from 'react-modal';

import TagBox from './TagBox';

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(50, 50, 50, 0.75)",
        zIndex: 99999,          
    },
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '600px',
        padding: '0',
        border: 'none',
    },
};

const SelectHashtagBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    padding: 20px 20px 10px;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: scroll;
    ::-webkit-scrollbar { 
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #333;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track { 
        background: none;
    }

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
        margin-bottom: 30px;

        h3 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        p {
            font-size: 12px;
        }
    }
`

const PlaceHashtag = memo(props => {
    const { data: data_hashtag, loading: loading_hashtag, error: error_hashtag } = useSelector(state => state.HashtagSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTags());
    }, []);

    const onClosePopUpClick = useCallback(e => {
        const targets = document.querySelectorAll('li');
        let values = [];

        targets.forEach(v => {
            if (v.classList.contains('active')) values.push(v.innerHTML);
        });

        console.log(values);
        props.setSelectedTags(state => values);

        props.closeModal();
    }, [props]);

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={modalStyle}
            ariaHideApp={false}
        >
            <SelectHashtagBox>
                <button className='closePopUp' onClick={props.closeModal}>X</button>
                <div className='top-desc'>
                    <h3>??? ????????? ?????? ?????????????</h3>
                    <p>???????????? ????????? ??????????????????</p>
                </div>
                {
                    data_hashtag && data_hashtag.map((v, i) => {
                        return (
                            <TagBox
                                key={i}
                                subject={v.subject}
                                values={v.values}
                                selectedTags={props.selectedTags}
                                setSelectedTags={props.setSelectedTags}
                            />
                        );
                    })
                }
            </SelectHashtagBox>
        </Modal>
    );
});

export default PlaceHashtag;