import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    /* background-color:#FBD6E3;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 100%;
    padding: 100px 0 10px; */
`

export const WrapperTextHeader = styled(Link)`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    &:hover {
        font-size: 18px;
        color: #fb6f92;
    }
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    color: #fff;
    font-weight:700;
    /* text-shadow: 0px 0px 0px #ffffff; */
    white-space: nowrap;
`
export const WrapperPopup = styled.div`

    position: fixed;

`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    /* position: fixed; */
    &:hover {
        color: rgb(26, 148, 255);
    }
`