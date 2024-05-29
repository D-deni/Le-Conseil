import React, {useEffect, useState} from 'react';
import BlockTitle from "../../components/UI/Other/BlockTitle.jsx";
import BlockContentService from "../../components/UI/Other/BlockContentService.jsx";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {loadServiceElem} from "../../store/service.js";
import {useParams } from "react-router-dom";
import {loadSiteContent, restructureData} from "../../store/site.js";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper/modules";
import axios from "../../composables/axios.js";

const Element = () => {
  const site = useSelector(state => state.site);
  const serviceItem = useSelector(state => state.service)
  const [currentLocale, setCurrentLocale] = useState(localStorage.getItem("lang"))
  const dispatch = useDispatch()
  const {serviceId} = useParams()
  useEffect(() => {
    dispatch(loadServiceElem({id: serviceId}))
    dispatch(loadSiteContent({page_name: 'services'}))
  }, [dispatch]);
  useEffect(() => {
    dispatch(restructureData())
  }, [site.siteData]);
  useEffect(()=> {
    const localeFromLocalStorage = localStorage.getItem('token')
    if(localeFromLocalStorage){
      setCurrentLocale(localeFromLocalStorage)
    }
  }, [])
  return (
    <div>
      <header className={' bg-center h-max bg-black '}>
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
                  <BlockTitle key={index} title={currentLocale === 'en' ? slide.title?.en : currentLocale === 'ru' ? slide.title?.ru : slide.title?.uz}
                              titleAnimation={true}
                              titleStyle={'text-5xl max-md:text-3xl max-sm:text-2xl font-timesNewRomanBold my-12 max-md:my-8 tracking-wider'}
                              above={currentLocale === 'en' ? slide.toc?.en : currentLocale === 'ru' ? slide.toc?.ru : slide.toc?.uz}
                              aboveStyle={'text-xl max-md:text-lg font-evolventaRegular uppercase text-titleLactic'}></BlockTitle>

                  <BlockTitle key={index}
                              subtitleStyle={'text-lg max-md:text-sm font-evolventaRegular w-8/12 mx-auto tracking-wider'}
                              subtitle={currentLocale === 'en' ? slide.subtitle?.en : currentLocale === 'ru' ? slide.subtitle?.ru : slide.subtitle?.uz}></BlockTitle>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
      <div>
          <BlockContentService
            titleInBlock={false}
            blockStyle={'flex max-lg:flex-col gap-x-6 justify-center py-20 max-lg:py-10 max-lg:text-center max-lg:gap-y-10'}
            props={serviceItem.serviceDataElem}/>
      </div>
    </div>
  );
};

export default Element;