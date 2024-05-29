import {useRef} from "react";
import BlockTitle from "../../UI/Other/BlockTitle.jsx";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Practice.css'
import PracticeSlide from "./PracticeSlide.jsx";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Practice = () => {
  const practiceList = useSelector(state => state.practic)
  const site = useSelector(state => state.site)
  const naviNext = useRef(null)
  const naviPrev = useRef(null)
  const {t} = useTranslation()

  const ruArray = site.siteData.why_are_we[0]?.ru || [];
  const itemWithPercentage = ruArray.find(item => item.number && item.number.includes('%'));
  const numberWithPercentage = itemWithPercentage?.number;
  return (
    <div className={'bg-greenDark py-[100px] max-md:py-10'}>
      <div className={'container mx-auto '}>
        <div className={'text-center'}>
          <BlockTitle title={t('Наша') + ' '} titleSpan={t('практика')}
                      titleStyle={'text-6xl max-sm:text-5xl font-timesNewRomanBold text-titleDark'}
                      titleSpanStyle={'text-titleLactic'} subtitle={numberWithPercentage + " " + t('дел завершены с положительным результатом')}
                      subtitleStyle={'text-subtitleLactic font-evolventaRegular text-2xl max-md:text-xl max-md:pt-6'}></BlockTitle>
        </div>
        <div className={'my-[100px] relative flex max-sm:flex-wrap max-sm:my-[40px]'}>
          <button ref={naviPrev} className={'max-md:w-full my-auto max-sm:hidden '}>
            <svg  width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none"
                 stroke="#BA9E74">
              <polyline points="20 24 12 32 20 40"/>
              <line x1="52" y1="32" x2="12" y2="32"/>
            </svg>
          </button>

          <Swiper className={'p-20 rounded-[10px]'}
                  slidesPerView={1}
                  pagination={{
                    el: "#containerForBullets",
                    type: "bullets",
                    bulletClass: "swiper-custom-bullet",
                    bulletActiveClass: "swiper-custom-bullet-active",
                    clickable: true,
                  }}
                  loop={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      pagination: true
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 80,
                      pagination: false
                    },

                    1100: {
                      slidesPerView: 3,
                      spaceBetween: 180,
                      pagination: false
                    },
                    1400: {
                      slidesPerView: 4,
                      spaceBetween: 100,
                      pagination: false
                    },
                    1536: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                      pagination: false
                    }
                  }}
                  navigation={{
                    nextEl: naviNext.current,
                    prevEl: naviPrev.current,
                  }}
                  modules={[Navigation, Pagination]}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.nextEl = naviNext.current
                    swiper.params.navigation.prevEl = naviPrev.current
                  }}
          >

            {practiceList.practicData.data?.map(item =>
              <SwiperSlide key={item.id}>
                <PracticeSlide key={item.id} props={item} descriptionStyle={'text-white'} linkUrl={item.id} pageUrl={'practice'}/>
              </SwiperSlide>
            )
            }
            <SwiperSlide className={'mx-auto flex justify-center w-full'}>
              <Link to={'/practice'} className={'mx-auto bg-[#023234] w-[300px] h-[384px] rounded-[10px] flex font-evolventaRegular text-white justify-center items-center text-2xl uppercase'}>{t('Подробнее')}</Link>
            </SwiperSlide>
          </Swiper>
          <button ref={naviNext} className={'max-md:w-full h-max my-auto max-sm:hidden  z-10'}>
            <svg className={'rotate-180'} width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none"
                 stroke="#BA9E74">
              <polyline points="20 24 12 32 20 40"/>
              <line x1="52" y1="32" x2="12" y2="32"/>
            </svg>
          </button>
        </div>
        <div id="containerForBullets" className={'flex justify-center gap-x-3'}></div>
      </div>
    </div>
  );
};

export default Practice;