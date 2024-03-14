import React from 'react'
import './advantage.css'
import img from '../../../assets/images/ab_avt3.jpg'
import img1 from '../../../assets/images/ab_avt2.jpg'
import img2 from '../../../assets/images/ab_avt1.jpg'

const Advantage = () => {
  return (
    <section className='advantage section'>
        <div className='secContainer'>
            <div className='title'>
                Tại sao nên chọn chúng tôi?
            </div>


            <div className='mainContent container grid'>
                <div className='singleItem'>
                    <img src={img} alt='Image Name'/>
                    <h3>SẢN PHẨM ĐA DẠNG</h3>
                    <p>
                        Với nhiều loài hoa khác nhau, đa dạng về nguồn gốc, hình dạng và màu sắc có thể đáp ứng tất cả nhu cầu mua sắm của khách hàng
                    </p>
                </div>

                <div className='singleItem'>
                    <img src={img1} alt='Image Name'/>
                    <h3>GIÁ CẢ HỢP LÝ</h3>
                    <p>
                        Giá thành đi đôi với chất lượng, WindyIris sẽ dành nhiều ưu đãi cho khách hàng nhưng chất lượng vẫn không thay đổi
                    </p>
                </div>

                <div className='singleItem'>
                    <img src={img2} alt='Image Name'/>
                    <h3>GIAO HÀNG NHANH</h3>
                    <p>
                        Khi mua hàng, khách hàng sẽ nhận được hoa một cách nhanh nhất, đảm bảo khi đến tay vẫn tươi và đẹp nhất
                    </p>
                </div>

            </div>

        </div>

    </section>
  )
}

export default Advantage