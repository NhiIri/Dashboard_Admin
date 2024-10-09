import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color:#ffff;
    align-items: center;
    gap: 16px;
    position:fixed;
    flex-wrap: nowrap;
    /* width: 100%;*/
    padding: 0px 0px 10px 20px;
    width:200px;
    height: 90px;
    z-index: 1000;
    /* display:flex;
    flex-direction:row-reverse; */
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
    /* flex-direction:row-reverse; */
    padding-right: 15px;
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
&.ant-popover-inner-content {
    padding: 10px 15px 1px;
    position:fixed
}
    cursor: pointer;
    &:hover {
        color: red;
    }
`