import React from 'react'
import './information.css'
// import { FaChevronLeft } from "react-icons/fa6";
// import { FaChevronRight } from "react-icons/fa6";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { PiFlowerLotusThin } from "react-icons/pi";
import img from '../../assets/images/fl4.jpg'
import img2 from '../../assets/images/fl6.jpg'
import img3 from '../../assets/images/fl3.jpg'

const Data = [
  {
    id:1,
    imgSrc: img,
    destTitle:'Hoa Mao Lương',
    location: 'HOA MAO LƯƠNG',
    grade: 'Có nguồn gốc xuất xứ từ Địa trung hải, Australia. Đây là một loài hoa rất được ưa chuộng bởi vẻ tròn trĩnh đáng yêu, màu sắc đa dạng, vô cùng tươi đẹp. Hoa mao lương xuất hiện để tượng trung cho sự quyến rũ và hấp dẫn của các nền văn hóa và các thế hệ.',
   },
  {
  id:2,
  imgSrc: img2,
  destTitle:'Hoa Tulip',
  location: 'HOA TULIP',
  grade: 'Có nguồn gốc từ vùng Trung Đông, hiện nay được trồng ở khắp nơi trên thế giới. Đặc biệt nổi tiếng tại Hà Lan với các cánh đồng hoa tulip tuyệt đẹp.  Các cánh hoa có thể mịn, tua hoặc xù. Những bông hoa tulip được đánh giá là có vẻ đẹp độc đáo, khác biệt đem đến cảm giác dễ chịu. Mùa hoa nở rộ là từ tháng 4 đến tháng 5.',
 },
 {
  id:3,
  imgSrc: img3,
  destTitle:'Hoa Mẫu Đơn',
  location: 'HOA MẪU ĐƠN',
  grade: 'Có nguồn gốc từ Trung Quốc - Tây Tạng. Những đóa hoa nở to, có một mùi hương vô cùng gợi cảm và thanh bạch. Mẫu đơn được coi như là một phép ẩn dụ cho vẻ đẹp của phụ nữ, vừa cao quý vừa quyến rũ.',
 },

]

const Information = () => {
  return (
    <section className='infomation'>
      <div className='secContainer'> 

      <div className='sec_header'>
        <div className='textDiv'>
          <h2 className='sec_title'>Information</h2>
          <p>
            Ngắm nhìn, đọc hiểu và cảm nhận..
          </p>
        </div>

        {/* <div className='iconsDiv flex'> 
        <FaChevronLeft className='icon left_icon'/>
        <FaChevronRight className='icon right_icon'/>

        </div> */}

      </div>

      <div className='mainContent' style={{display:'grid'}}>
        {
          Data.map(({id,imgSrc,destTitle,location,grade})=>{
            return(
              <div className='singleDestination'>
          <div className='dest_img'>
            <img src ={imgSrc} alt="img_title"/>
            <div className='overlayInfo'>
              <h3>{destTitle}</h3>
              <p>
                {grade} 
              </p>
              {/* <FaArrowRightLong  className='icon'/> */}

            </div>

          </div>
          <div className='dest_footer'>
            <div className='number'>
              0{id}
            </div>
            <div className='dest_test'>
              <h6>{location}</h6>
              <span className='flex'> 
                <span className='flower'>
                {/* <PiFlowerLotusThin className='icon'/> */}
                </span>
                WindyIris
              </span>
            </div>

             
          </div>
        
        </div>
            )
          })
        }

      </div>

      </div>

    </section>
  )
}

export default Information