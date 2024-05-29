import React, {useEffect, useState} from 'react';
import BlockTitle from "../../components/UI/Other/BlockTitle.jsx";
import TeamCard from "../../components/Reused/TeamCard.jsx";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {loadTeams} from "../../store/team.js";
import {loadSiteContent, restructureData} from "../../store/site.js";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper/modules";
import axios from "../../composables/axios.js";
import {useTranslation} from "react-i18next";

const Team = () => {
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams)
  const site = useSelector(state => state.site)
  const {t, i18n} = useTranslation()
  const handlePageChange = (url) => {
    const urlParams = new URL(url)
    const page = urlParams.searchParams.get('page')
    dispatch(loadTeams({page: page}))
  }
  useEffect(() => {
    dispatch(loadTeams({page: 1}))
    dispatch(loadSiteContent({page_name: 'team'}))
    console.log(teams.teamData.data)
  }, [dispatch]);
  useEffect(() => {
    dispatch(restructureData())
  }, [site.siteData]);
  return (
    <motion.div initial={{y: -20, opacity: 0.8}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99]}}>
      <header className={'h-max bg-black'}>
        <Swiper spaceBetween={30} effect={'fade'} autoHeight={true} modules={[EffectFade, Autoplay]}
                autoplay={{
                  delay: 6500,
                  disableOnInteraction: false,
                }}>
          {site.newSlides?.map((slide, index) => (
            <SwiperSlide key={index} className={'bg-cover h-full bg-black'}>
              <img className={'absolute object-cover h-full w-full bg-center'}
                   src={axios.getUri() + 'storage/' + slide.title.picture}
                   alt=""/>
              <div className="backdrop-invert-0 bg-black/60">
                <div
                  className={'container py-60 max-md:pt-40 max-md:pb-10 max-md:py-0 text-white flex flex-col justify-center mx-auto text-center items-center max-md:flex-col'}>
                  <BlockTitle key={index}
                              title={i18n.language === 'en' ? slide.title?.en : i18n.language === 'ru' ? slide.title?.ru : slide.title?.uz}
                              titleAnimation={true}
                              titleStyle={'text-5xl max-md:text-3xl max-sm:text-2xl font-timesNewRomanBold my-12 max-md:my-8 tracking-wider'}
                              above={i18n.language === 'en' ? slide.toc?.en : i18n.language === 'ru' ? slide.toc?.ru : slide.toc?.uz}
                              aboveStyle={'text-xl max-md:text-lg font-evolventaRegular uppercase text-titleLactic'}></BlockTitle>

                  <BlockTitle key={index}
                              subtitleStyle={'text-lg max-md:text-sm font-evolventaRegular w-8/12 mx-auto tracking-wider'}
                              subtitle={i18n.language === 'en' ? slide.subtitle?.en : i18n.language === 'ru' ? slide.subtitle?.ru : slide.subtitle?.uz}></BlockTitle>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
      <section className={'container mx-auto py-[100px] max-md:py-[40px] max-md:px-6'}>
        <BlockTitle title={t('Наша') + ' '}
                    titleStyle={'text-6xl max-md:text-4xl font-timesNewRomanBold max-md:text-center'}
                    subtitleStyle={'text-2xl mt-4 max-md:text-lg max-md:text-center'}
                    titleSpan={t('Команда')} titleSpanStyle={'text-titleLactic'}/>
        <div
          className={'flex flex-wrap max-md:items-center max-lg:justify-center justify-between gap-y-10 max-lg:gap-x-4 my-20 max-md:my-10'}>
          {teams.teamData.data ?
            teams.teamData.data?.map((item) =>
              <TeamCard flag={'page'} key={item.id} {...item}/>
            ) :
            Array.from({length: 7}).map((_,i)=> (
              <div key={i}
                   className={'bg-black bg-opacity-15 h-[500px] flex justify-center items-center w-[350px] rounded-3xl text-white'}>
                <div className="loader"></div>
              </div>
            ))
          }
        </div>
        <div className={'flex justify-center gap-x-10'}>
          {teams.teamData.links?.map((item, i) => (
            <button onClick={() => item.url && handlePageChange(item.url)}
                    className={`rounded-full bg-titleLactic py-2 px-4 font-evolventaBold text-xl ${!item.active ? 'opacity-40 text-gray-600' : 'text-white'}`}
                    key={i}>{item.label.replace("Next", '').replace("Previous", '').replace("&raquo;", '\u003E').replace("&laquo;", "\u003C")}</button>
          ))
          }
        </div>
      </section>

    </motion.div>
  );
};

export default Team;