import {useEffect} from 'react';
import BlockTitle from "../UI/Other/BlockTitle.jsx";
import ServicesBlock from "./Services/ServicesBlock.jsx";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {loadService} from "../../store/service.js";
import {setTypeService} from "../../store/service.js";
import {useTranslation} from "react-i18next";

const Services = () => {
  const typeService = useSelector(state => state.service.typeService)
  const {t} = useTranslation()
  const blockAnimation = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible:custom => ({
      opacity: 1,
      y: 0,
      transition: {delay: custom * 0.2}
    })
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadService({page: 1, limit: 15}))
    console.log(typeService)
  }, [dispatch]);
  return (
    <motion.div initial={'hidden'} whileInView={'visible'} viewport={{once: true}} className={'container mx-auto my-[100px] max-sm:my-10'}>
      <div className={'flex justify-between items-center flex-wrap max-lg:justify-center max-lg:items-center max-lg:text-center gap-y-10 max-md:mx-3'}>
        <BlockTitle title={t('Наши') + ' '} titleSpan={t('услуги')}
                    titleStyle={'text-6xl max-sm:text-5xl font-timesNewRomanBold text-titleDark'}
                    titleSpanStyle={'text-titleLactic'}></BlockTitle>
        <div className={'flex font-evolventaRegular text-lg max-sm:text-base'}>
          <button className={typeService === 'legal' ? 'border-b pr-5': 'border-b border-titleLactic text-titleLactic transition-all pr-5'} onClick={()=> dispatch(setTypeService('physical'))}>{t('Физическим лицам')}</button>
          <button className={typeService === 'physical' ? 'border-b pl-5' : 'border-b border-titleLactic text-titleLactic pl-5 transition-all'} onClick={()=> dispatch(setTypeService('legal'))}>{t('Юридическим лицам')}</button>
        </div>
      </div>
      <motion.div custom={3.3} variants={blockAnimation} className={'mt-20 max-sm:mx-3'}>
        <ServicesBlock/>
      </motion.div>
    </motion.div>
  );
};

export default Services;