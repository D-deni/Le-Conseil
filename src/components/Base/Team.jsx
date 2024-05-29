import React, {useRef, useState} from 'react';
import BlockTitle from "../UI/Other/BlockTitle.jsx";
import {t} from 'i18next'
import Arrow from '/src/assets/img/icons/arrow.svg'
import TeamCard from "../Reused/TeamCard.jsx";
import Avatar from '/src/assets/img/block/img-block-team.png'
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Team = () => {
  const teamList = useSelector(state => state.teams)
  const Next = useRef(null)
  const Prev = useRef(null)
  const {t} = useTranslation()
  return (
    <div
      className={'container flex justify-between mx-auto my-[100px] max-sm:my-[40px] max-md:px-10 max-md:flex-col max-md:items-center'}>
      <div className={'w-4/12 max-lg:w-5/12 max-md:w-full  max-md:text-center'}>
        <BlockTitle title={t('Наша') + ' '}
                    titleStyle={'text-titleDark font-timesNewRomanBold text-6xl max-sm:text-[44px]'}
                    titleSpanStyle={'text-titleLactic'} titleSpan={t('Команда')}></BlockTitle>
        <div>
          <p
            className={'py-[50px] max-sm:text-base max-sm:py-[20px] text-lg break-words'}>{t('Работая с нами, нужно понимать, что мы как футбольная команда. По количеству людей и по расходам на них. Но в отличии от сборной России и по футболу, Ваши ожидание - это наши проблемы. Если вы вовремя оплатили счёт!')}</p>
          <Link to={'/team'}
                className={'max-w-[80%] max-lg:max-w-[100%] text-white max-md:mx-auto uppercase font-evolventaBold text-base max-sm:text-sm bg-black px-16 max-sm:px-12 py-5 flex justify-center items-center rounded-lg hover:bg-lactic transition-all duration-200 hover:text-titleDark'}>
            <p>{t('Кто в команде?')}</p>
          </Link>
          <div className={'flex gap-x-4 max-md:justify-center'}>
            <button ref={Prev}>
              <svg width="70px" height="70px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none"
                   stroke="black">
                <polyline points="20 24 12 32 20 40"/>
                <line x1="52" y1="32" x2="12" y2="32"/>
              </svg>
            </button>
            <button ref={Next} className={'rotate-180'}>
              <svg width="70px" height="70px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none"
                   stroke="#DCAB2F">
                <polyline points="20 24 12 32 20 40"/>
                <line x1="52" y1="32" x2="12" y2="32"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={'w-6/12 max-md:w-full'}>
        <Swiper className={'rounded-lg'}
                slidesPerView={1}
                navigation={{
                  prevEl: Prev.current,
                  nextEl: Next.current
                }}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = Prev.current
                  swiper.params.navigation.nextEl = Next.current
                }}
        >

          {teamList.teamData.data?.map(item =>
            <SwiperSlide key={item.id}>
              <TeamCard flag={'slider'} key={item.id} {...item}/>
            </SwiperSlide>
          )
          }
        </Swiper>
      </div>
    </div>
  );
};

export default Team;