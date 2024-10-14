import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #00000099;
  font-size: 20px;
  font-weight: 700;
  padding: 20px;
  position: fixed;
  z-index: 1000;
  /* box-shadow: rgb(160 160 160) 5px 5px 15px; */
  background-color: #fff;
  border-radius: 0px 0px 0px 5px;
  width: 100%;
  height: 70px;
  margin-left: 205px;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-item-info {
    display: none;
  }
  & .ant-upload-list-item {
    display: none;
  }
`;
