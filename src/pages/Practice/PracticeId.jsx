import React, {useEffect, useState} from 'react';
import Breadcrumbs from "../../components/UI/Other/Breadcrumbs.jsx";
import BlockTitle from "../../components/UI/Other/BlockTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loadPracticElem} from "../../store/practic.js";
import {useParams} from "react-router-dom";
import BlockContentPractic from "../../components/UI/Other/BlockContentPractic.jsx";
import {loadSiteContent, restructureData} from "../../store/site.js";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from 'swiper/modules';
import axios from "../../composables/axios.js";
const PracticeId = () => {
  const site = useSelector(state => state.site);
  const practiceItem = useSelector(state => state.practic)
  const dispatch = useDispatch()
  const {id} = useParams()
  useEffect(() => {
    dispatch(loadPracticElem({id: id}))
    dispatch(loadSiteContent({page_name: 'practice'}))
  }, [dispatch]);
  useEffect(() => {
    dispatch(restructureData())
  }, [site.siteData]);
  return (
    <div>
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
                  <BlockTitle key={index} title={slide.title?.ru || slide.title?.uz || slide.title?.en}
                              titleAnimation={true}
                              titleStyle={'text-5xl max-md:text-3xl max-sm:text-2xl font-timesNewRomanBold my-12 max-md:my-8 tracking-wider'}
                              above={slide.toc && slide.toc?.ru || slide.toc?.en || slide.toc?.uz}
                              aboveStyle={'text-xl max-md:text-lg font-evolventaRegular uppercase text-titleLactic'}></BlockTitle>

                  <BlockTitle key={index}
                              subtitleStyle={'text-lg max-md:text-sm font-evolventaRegular w-8/12 mx-auto tracking-wider'}
                              subtitle={slide.subtitle?.ru || slide.subtitle?.en || slide.subtitle?.uz}></BlockTitle>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
      <section className={'max-sm:px-0'}>
        <BlockContentPractic
          titleAnimation={true}
          titleInBlock={true}
          blockStyle={'flex flex-row-reverse gap-x-4 max-md:flex-wrap max-md:gap-y-10 max-md:mb-5'}
          props={practiceItem.practicDataElem}
        />
      </section>
    </div>
  );
};

export default PracticeId;