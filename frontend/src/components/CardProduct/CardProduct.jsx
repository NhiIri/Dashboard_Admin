import React from 'react'
import img1 from '../../assets/images/h_slide1.jpg'
import img2 from '../../assets/images/h_slide2.jpg'
import img3 from '../../assets/images/h_slide3.jpg'
import './Style.css'

const CardProduct = () => {
  return (
    <div>
    <body>
    <h1 class="title-shop">SHOP</h1>
    <main class="main bd-grid">
        <article class="card">
            <div class="card__img">
                <img src={img1} alt=""/>
            </div>
            <div class="card__name">
                <p>AIR ZOOM PEGASUS</p>
            </div>
            <div class="card__precis">
                <a href="" class="card__icon" ><ion-icon name="heart-outline"></ion-icon></a>
                
                <div>
                    <span class="card__preci card__preci--before">$990.00</span>
                    <span class="card__preci card__preci--now">$749.00</span>
                </div>
                <a href="" class="card__icon"><ion-icon name="cart-outline"></ion-icon></a>
            </div>
        </article>

        <article class="card">
            <div class="card__img">
                <img src={img2} alt=""/>
            </div>
            <div class="card__name">
                <p>AIR ZOOM PEGASUS</p>
            </div>
            <div class="card__precis">
                <a href="" class="card__icon" ><ion-icon name="heart-outline"></ion-icon></a>
                <div>
                    <span class="card__preci card__preci--before">$990.00</span>
                    <span class="card__preci card__preci--now">$749.00</span>
                </div>
                <a href="" class="card__icon"><ion-icon name="cart-outline"></ion-icon></a>
            </div>
        </article>

        <article class="card">
            <div class="card__img">
                <img src={img3} alt=""/>
            </div>
            <div class="card__name">
                <p>AIR ZOOM PEGASUS</p>
            </div>
            <div class="card__precis">
                <a href="" class="card__icon" ><ion-icon name="heart-outline"></ion-icon></a>
                
                <div>
                    <span class="card__preci card__preci--before">$990.00</span>
                    <span class="card__preci card__preci--now">$749.00</span>
                </div>
                <a href="" class="card__icon"><ion-icon name="cart-outline"></ion-icon></a>
            </div>
        </article>

        <article class="card">
            <div class="card__img">
                <img src={img1} alt=""/>
            </div>
            <div class="card__name">
                <p>AIR ZOOM PEGASUS</p>
            </div>
            <div class="card__precis">
                <a href="" class="card__icon" ><ion-icon name="heart-outline"></ion-icon></a>
                
                <div>
                    <span class="card__preci card__preci--before">$990.00</span>
                    <span class="card__preci card__preci--now">$749.00</span>
                </div>
                <a href="" class="card__icon"><ion-icon name="cart-outline"></ion-icon></a>
            </div>
        </article>
    </main>
    <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
</body>
</div>
  )
}

export default CardProduct