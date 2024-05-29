import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../components/UI/Other/Button.jsx";
import Quality from "../components/Reused/Quality/Quality.jsx";
import Services from "../components/Base/Services.jsx";
import Practice from "../components/Reused/Practice/Practice.jsx";
import WhyUs from "../components/Reused/WhyUs/WhyUs.jsx";
import Team from "../components/Base/Team.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadTeams} from "../store/team.js";
import {loadServiceElem} from "../store/service.js";
import {loadSiteContent, restructureData, uploadApplication} from "../store/site.js";
import {loadPractic} from "../store/practic.js";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from 'swiper/modules';
import '../App.css'
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Modal from "../components/UI/Other/Modal.jsx";
import axios from "../composables/axios.js";
import {useTranslation} from "react-i18next";

const countries = defaultCountries.filter((country) => {
  const {iso2} = parseCountry(country);
  return ['uz'].includes(iso2)
})
const Base = () => {
  const dispatch = useDispatch()
  const siteContent = useSelector(state => state.site)
  const [phone, setPhone] = useState()
  const [description, setDesc] = useState()
  const [fio, setFio] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {t, i18n} = useTranslation()
  const openModal = (e) => {
    setIsModalOpen(true)
    e.preventDefault()
  };
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const changeFio = (event) => {
    setFio(event.target.value)
  }
  const changeDesc = (event) => {
    setDesc(event.target.value)
  }
  const handleUpload = (event) => {
    event.preventDefault()
    dispatch(uploadApplication({phone, description, fio}))

    if (uploadApplication.fulfilled && phone.length === 13 && description.trim().length > 0 && fio.trim().length > 0) {
      closeModal()
      toast.success(t('Успешно отправлено'), {autoClose: 1500, theme: 'dark'})
      setPhone('')
      setDesc('')
      setFio('')
    } else {
      toast.error(t('Возникла ошибка при отправке'), {autoClose: 1500, theme: 'dark'})
      closeModal()
    }
  }
  useEffect(() => {
    dispatch(loadTeams({page: 1, limit: 15}))
    dispatch(loadServiceElem({id: 1}))
    dispatch(loadPractic({page: 1, limit: 15}))
    dispatch(loadSiteContent({page_name: 'main'}))
  }, [dispatch]);
  useEffect(() => {
    dispatch(restructureData())
  }, [dispatch, siteContent.siteData]);

  return (

    <motion.main initial={{y: -20, opacity: 0.8}}
                 animate={{y: 0, opacity: 1}}
                 transition={{duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99]}}>
      <ToastContainer/>
      <header className={'max-lg:bg-center'}>
        <motion.div initial={'hidden'} viewport={{once: true}} whileInView={'visible'}
                    className={''}>
          <Swiper spaceBetween={30} effect={'fade'} autoHeight={true} modules={[EffectFade, Autoplay]}
                  autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                  }}>
            {siteContent.newSlides?.map((slide, index) => (
              <SwiperSlide key={index} className={' bg-black'}>
                <img className={'absolute object-cover w-full h-full bg-center'}
                     src={axios.getUri() + 'storage/' + slide.title.picture}
                     alt=""/>
                <div className="backdrop-invert-0 bg-black/60">
                  <div
                    className={'container mx-auto py-40 max-md:pt-40 max-md:pb-10 max-md:py-0 text-white flex justify-between items-center max-md:flex-col'}>
                    <div className={'w-8/12 max-lg:w-9/12 max-md:w-full max-md:text-center '}>
                      <motion.h4 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}}
                        className={'font-evolventaRegular text-lg text-semiLightGray max-lg:text-base mb-4 max-sm:text-base'}>{i18n.language === 'en' ? slide.toc?.en : i18n.language === 'ru' ? slide.toc?.ru : slide.toc?.uz}</motion.h4>
                      <div>
                        <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 3}}
                          className={'text-4xl max-lg:text-5xl uppercase font-timesNewRomanBold max-sm:text-2xl break-words'}>{i18n.language === 'en' ? slide.title?.en : i18n.language === 'ru' ? slide.title?.ru : slide.title?.uz}</motion.h1>
                        <motion.h3 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 4}}
                                   className={'text-xl w-9/12 max-lg:text-xl max-sm:text-lg font-timesNewRomanRegular uppercase break-words'}>{i18n.language === 'en' ? slide.subtitle['en'] : i18n.language === 'ru' ? slide.subtitle['ru'] : slide.subtitle['uz']}</motion.h3>
                      </div>
                      <div className={'w-4/12 max-lg:w-7/12 break-words mt-[140px] max-md:mx-auto max-md:text-center'}>
                        <p
                          className={'font-evolventaRegular text-sm tracking-widest'}>{t('Нужна консультация ? Оставьте заявку, перезвоним в течение часа.')}</p>
                        <div onClick={openModal}>
                          <Button
                            styles={'w-full hover:bg-black transition-all duration-200 hover:text-white bg-lacticElem text-titleDark py-4 font-bold  uppercase text-sm tracking-wider mt-5 rounded-xl'}
                            content={t('Оставить заявку')}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <Modal className={''} mWidth={'w-4/12 max-lg:w-10/12 max-[350px]:w-full max-[350px]:h-full'} isOpen={isModalOpen} onClose={closeModal}>
          <form onSubmit={handleUpload}
                className={'flex max-lg:flex-wrap max-lg:justify-center max-lg:gap-y-6 gap-x-10'}>
            <div className={'flex gap-y-5 flex-col w-full'}>
              <div>
                <p className={'mb-6'}>{t('Фамилия Имя Отчество')}</p>
                <input value={fio} onChange={changeFio} className={'border resize-none w-full rounded-lg p-2 outline-none focus:border-titleLactic transition-all'} type="text"/>
              </div>
              <div>
                <p>{t('Телефон')}</p>
                <PhoneInput countries={countries} defaultCountry='uz' forceDialCode={true} value={phone}
                            onChange={(phone) => setPhone(phone)}/>
              </div>
              <div>
                <p className={'mb-6'}>{t('Описание')}</p>
                <textarea value={description} onChange={changeDesc}
                          className={'border resize-none w-full h-[250px] rounded-lg p-2 outline-none focus:border-titleLactic transition-all'}/>
              </div>
              <div className={'flex justify-center'}>
                <Button
                  styles={'bg-lactic hover:text-white hover:bg-black transiiton-all duration-300 py-2 px-6 rounded-full outline-titleLactic uppercase font-evolventaBold tracking-wider'}
                  content={t('Отправить')}></Button>
              </div>
            </div>
          </form>
        </Modal>
      </header>
      <main className={'overflow-hidden'}>
        <section>
          <Quality containerStyles={'bg-lactic'}></Quality>
        </section>
        <section>
          <Services/>
        </section>
        <section>
          <Practice/>
        </section>
        <section>
          <WhyUs bgShow={'bg-whyUs bg-cover bg-top bg-fixed'} itemBg={'bg-white'}/>
        </section>
        <section>
          <Team/>
        </section>
      </main>
    </motion.main>
  );
};

export default Base;