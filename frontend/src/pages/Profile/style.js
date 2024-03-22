import { Upload } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled.h1`
    color: #000;
    height: 50px ;
    background-color:#FBD6E3;
    font-size: 20px;
    font-weight:bold;
    padding-left: 5%;
    padding-top: 8px;


`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 2px solid #E57089;
    background-color:#fff;
    width: 70%;
    margin:auto;
    padding: 30px;
    border-radius: 10px;
    /* gap: 30px; */
`
export const WrapperContentProfile1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin: 50px auto;
    padding: 30px;
    gap: 40px;
`
export const WrapperLabel = styled.label`
    color: #000;
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    width: 60px;
    text-align: left;
    font-family:Andale Mono, monospace;
`

export const WrapperInput = styled.div`
    display: flex;
    width:'70%';
    align-items: center;
    gap: 20px; 
`
export const WrapperInput1 = styled.div`
    display: flex;
    justify-items: center;
    gap: 20px;
    flex-direction: column;
    align-content: stretch;
    justify-content: center;
    align-items: center;
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`