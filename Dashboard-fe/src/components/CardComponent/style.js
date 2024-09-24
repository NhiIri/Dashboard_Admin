import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    margin:13px;
    align-items:center;
    position: relative;
    box-shadow: 0px 0px 5px #000;
    background-color: ${props => (props.disabled ? '#ccc' : '#fff')};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    &:hover{
        /* background-color:#E57098; */
        position: relative;
        transition: 0.5s ease;
        /* transform: translateY(-10px); *///di chuyển lên trên 
        box-shadow: 1px 1px 15px #000;
        transform: scale(1.1);//zoom
    }

    & img {
        background-size:cover;
        height: 300px;
        width: 100%;
        object-fit: cover; /* Giữ nguyên tỷ lệ khung và cắt ảnh để lấp đầy phần tử container */
        object-position: center; /* Cắt ảnh từ trung tâm */
    
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 10px;
    color: #000;
    font-family:'Bookman';
    padding-bottom:10px;
    padding-top:10px;
    text-align:center;
    /* border-top: 1.3px dashed black; */
    border-bottom: 1.3px dashed black;   
   
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.div`
    color: #E57098;
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 15px;
    font-weight: 700;
    position: absolute;
    bottom: 90%; /* Điều chỉnh khoảng cách từ dưới lên */
    left: 80%; /* Điều chỉnh khoảng cách từ trái qua */
    background-color: white;
    color:#E57098;
    padding: 2px 6px;
    border-radius:20px;

    /* width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px' */
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`