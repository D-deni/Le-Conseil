import BlockTitle from "../components/UI/Other/BlockTitle.jsx";
import { useEffect } from "react";
import Quality from "../components/Reused/Quality/Quality.jsx";
import WhyUs from "../components/Reused/WhyUs/WhyUs.jsx";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {loadSiteContent, restructureData} from "../store/site.js";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper/modules";
import axios from "../composables/axios.js";
import {useTranslation} from "react-i18next";

export default function About() {
  const dispatch = useDispatch()
  const site = useSelector(state => state.site)
  const {t, i18n} = useTranslation()
  useEffect(() => {
    dispatch(loadSiteContent({ page_name: 'about' }))
  }, [dispatch]);
  useEffect(() => {
    dispatch(restructureData())
  }, [site.siteData]);
  return (
    <motion.div initial={{y: -20, opacity: 0.8}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99]}}>
      <div className={'h-max bg-black'}>
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
      </div>
      <section className={'py-[100px] max-md:py-[40px]'}>
        <div className={'w-full break-words max-lg:w-full container mx-auto max-md:px-6'}>

          <div>
            {site.siteData.about?.map(el => (
              <div key={el.id} dangerouslySetInnerHTML={{__html: el.ru || el.en || el.uz}}/>
            ))
            }
          </div>
        </div>
        <div>
          <Quality></Quality>
          <WhyUs itemBg={'bg-[#F5F5F5]'}/>
        </div>
      </section>
    </motion.div>
  );
};

