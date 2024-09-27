import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px solid #708fe5;
    outline: none;
    &:focus {
        background-color: #708fe54a;
        border: 1.5px solid #708fe5;
    }
`