import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import MainBest from '../component/MainBest'
import MainPopular from '../component/MainPopular'

function Main() {
    return (
    <>
    <MainPage>
    <img src="/image/main-image01.jpeg" alt="main-image01" />
    {/*      <Swiper
             modules={[Navigation, Pagination]}
             spaceBetween={0} // 슬라이드 간격
             slidesPerView={1} // 한 스와이퍼에 몇장 보여줄지
             slidesPerGroup={1} // 한번 넘길때 몇장 넘어갈지
             speed={300} // 페이지 넘어가는 속도
             touchRatio={0} // 클릭해서 드래그 막음
             >
             <SwiperSlide>
             
             </SwiperSlide>
            </Swiper> */}
        <MainBest />
        <MainPopular />
    </MainPage>
    </>
    )
}

const MainPage = styled.div`
    min-width: 950px;
    // width: 90%;
    margin: 0 auto;
`

export default Main