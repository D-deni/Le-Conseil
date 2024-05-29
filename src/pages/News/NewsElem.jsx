import {useEffect} from 'react';
import Breadcrumbs from "../../components/UI/Other/Breadcrumbs.jsx";
import BlockTitle from "../../components/UI/Other/BlockTitle.jsx";
import BlockContentPractic from "../../components/UI/Other/BlockContentPractic.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loadNewsElem} from "../../store/news.js";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper/modules";
import axios from "../../composables/axios.js";
import {loadSiteContent, restructureData} from "../../store/site.js";
import {useTranslation} from "react-i18next";
const NewsElem = () => {
  const site = useSelector(state => state.site);
  const newsItem = useSelector(state => state.news)
  const dispatch = useDispatch()
  const {i18n} = useTranslation()
  const {id} = useParams()
  useEffect(() => {
    dispatch(loadNewsElem({id: id}))
    dispatch(loadSiteContent({page_name: 'news'}))
  }, [dispatch])
  useEffect(() => {
    dispatch(restructureData())
  }, [site.siteData]);
  return (
    <div>
      <Breadcrumbs/>
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
                  <BlockTitle key={index} title={i18n.language === 'en' ? slide.title?.en : i18n.language === 'ru' ? slide.title?.ru : slide.title?.uz}
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
      <section className={'max-sm:px-5'}>
        <BlockContentPractic
          titleAnimation={true}
          titleInBlock={true}
          blockStyle={'flex flex-row-reverse gap-x-4 max-md:flex-wrap max-md:gap-y-10 max-md:mb-5'}
          props={newsItem.newsDataElem}
        />
      </section>
    </div>
  );
};

export default NewsElem;