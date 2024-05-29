import {useEffect} from 'react';
import BlockTitle from "../../components/UI/Other/BlockTitle.jsx";
import PracticeSlide from "../../components/Reused/Practice/PracticeSlide.jsx";
import {t} from "i18next"
import {useDispatch, useSelector} from "react-redux";
import practic, {loadPractic} from "../../store/practic.js";
import {loadSiteContent, restructureData} from "../../store/site.js";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from 'swiper/modules';
import { motion } from "framer-motion";
import axios from "../../composables/axios.js";
import {useTranslation} from "react-i18next";
const Practice = () => {
  const practicList = useSelector(state => state.practic)
  const site = useSelector(state => state.site)
  const {i18n} = useTranslation()
  const dispatch = useDispatch()



  const ruArray = site.siteData.why_are_we[0]?.ru || [];
  const itemWithPercentage = ruArray.find(item => item.number && item.number.includes('%'));
  const numberWithPercentage = itemWithPercentage?.number;

  const handlePageChange = (url) => {
    const urlParams = new URL(url)
    const page = urlParams.searchParams.get('page')
    dispatch(loadPractic({page: page}))
  }


  useEffect(() => {
    dispatch(loadPractic({page: 1}))
    dispatch(loadSiteContent({page_name: 'practice'}))
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
      <section className={'container mx-auto py-[100px] max-md:py-[40px]'}>
        <div className={'mb-20 mx-auto text-center'}>
          <BlockTitle title={t('Наша') + ' '} titleStyle={'text-6xl max-md:text-4xl font-timesNewRomanBold'}
                      subtitle={numberWithPercentage + ' ' + t('дел завершены с положительным результатом')}
                      subtitleStyle={'text-2xl mt-2 max-md:text-lg text-[#777] font-evolventaRegular uppercase'}
                      titleSpan={t('практика')} titleSpanStyle={'text-titleLactic'}
          ></BlockTitle>
        </div>
        <div className={'grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-y-10'}>
          {practicList.practicData.data?.map(item =>
            <PracticeSlide key={item.id} descriptionStyle={'text-black'}
                           linkUrl={item.id}
                           pageUrl={'practice'}
                           props={item}/>
          )}
        </div>
        <div className={'flex justify-center gap-x-10 mt-10'}>
          {practicList.practicData.meta?.links?.map((item, i) => (
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

export default Practice;