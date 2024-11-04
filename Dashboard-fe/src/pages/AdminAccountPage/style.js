import { Upload } from "antd";
import styled from "styled-components";

// export const WrapperHeader = styled.h1`
//     color: #00000099;
//     font-size: 20px;
//     font-weight:700;
//     padding: 20px;
//     position:fixed;
//     z-index:1000;
//     background-color:#fff;
//     border-radius:0px 0px 0px 5px ;
//     width:100%;
//     height: 70px;
//     margin-left:205px;
// `
export const WrapperContentProfile = styled.div`
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* border: 2px solid #708fe5; */
    background-color:#fff;
    width: 100%;
    margin:auto;
    padding-left: 25px;
    border-radius: 10px;
`
export const WrapperContentProfile1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 50px auto;
    gap: 40px;
`
export const WrapperLabel = styled.label`
    color: #000;
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    width:90%;
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

`