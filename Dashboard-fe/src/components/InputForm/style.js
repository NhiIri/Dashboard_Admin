import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px solid #E57098;
    outline: none;
    &:focus {
        background-color: rgb(251, 214, 227);
        border: 1.5px solid #E57098;
    }
`