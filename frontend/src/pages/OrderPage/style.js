import { Checkbox } from "antd";
import styled  from "styled-components";


export const WrapperNavbar = styled.h1`
    color: #000;
    height: 50px ;
    background-color:#FBD6E3;
    font-size: 20px;
    padding-left: 15%;
    padding-top: 8px;
    margin:0;
`

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 500;
    font-size: 15px;

  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  margin-top:20px;
  margin-bottom: 30px;
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  border: 2px solid #e57098;
  display: flex;
  align-items: center;
  span {
    font-weight: 700;
    font-size: 15px;
  };
  margin-bottom: 20px;
`

export const WrapperLeft = styled.div`
  width: 100%;

`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  box-shadow: 0px 0px 5px #000;
  border-radius: 4px;
  margin-top: 10px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder  = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 50%;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center;

  margin-top:20px;
  
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border: 2px solid #000;
  border-top-left-radius: 6px;
  width: 100%
`

export const WrapperTotal = styled.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
    padding: 17px 20px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #9255FD;
    border-color: #9255FD;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #9255FD;
  }
`