import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import SwiperCore from "swiper";        // autoplay
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MainBest from '../component/MainBest'
import MainPopular from '../component/MainPopular'

function Main() {
    SwiperCore.use([Autoplay]);     // autoplay
    return (
    <>
    <MainPage>
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0} // 슬라이드 간격
            slidesPerView={1} // 한 스와이퍼에 몇장 보여줄지
            slidesPerGroup={1} // 한번 넘길때 몇장 넘어갈지
            speed={700} // 페이지 넘어가는 속도
            //  touchRatio={0} // 클릭해서 드래그 막음
            //  rewind={false}
            centeredSlides={true}
            // navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            scrollbar={{draggable: true}}
            >
            <SwiperSlide>
                <img src="/image/main-image01.jpeg" alt="main-image01" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/image/main-image02.jpeg" alt="main-image02" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/image/main-image03.jpeg" alt="main-image03" />
            </SwiperSlide>
        </Swiper>
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