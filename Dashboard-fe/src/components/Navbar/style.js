import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color:#708fe593;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    /* width: 100%;*/
    padding: 10px 0 10px; 
`

export const WrapperTextHeader = styled(Link)`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    &:hover {
        font-size: 18px;
        color: #708fe5;
    }
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    font-weight:700;
    color:#708fe5;
    white-space: nowrap;
`
export const WrapperPopup = styled.div`

    position: fixed;

`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`