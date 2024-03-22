import React from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo, WrapperOrderSuccess } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';


const OrderSucess = () => {
  const location = useLocation()
  const {state} = location
  return (
    <div style={{background: '#e0e0e0', with: '100%', height: '100vh'}}>
      <Loading isLoading={false}>
        <WrapperOrderSuccess>Order Success</WrapperOrderSuccess>
        <div style={{height: '100%', width: '90%', margin: '0 auto'}}>
          
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                    <WrapperValue>
                      <span style={{color: '#E57098', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                    </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',gap: '10px'}}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <div>
                <span style={{ fontSize: '16px', color: '#E57098',fontWeight:'bold' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSucess