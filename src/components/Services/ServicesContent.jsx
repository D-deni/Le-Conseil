import BlockTitle from "../UI/Other/BlockTitle.jsx";
import React, {useEffect, useState} from "react";
import ServicesBlock from "../Base/Services/ServicesBlock.jsx";
import ServicesElem from "./ServicesElem.jsx";
import imgBlock from '/src/assets/img/block/img-block-one.png'
import {useDispatch, useSelector} from "react-redux";
import {loadService, setTypeService} from "../../store/service.js";
import {useTranslation} from "react-i18next";
const ServicesContent = () => {
  const [activeElem, setActiveElem] = useState(false)
  const typeService = useSelector(state => state.service.typeService)
  const serviceList = useSelector(state => state.service)


  const handlePageChange = (url) => {
    const urlParams = new URL(url)
    const page = urlParams.searchParams.get('page')
    dispatch(loadService({page: page}))
  }


  const {t} = useTranslation();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadService({page: 1}))
  }, [dispatch]);
  return (
    <div className={'container mx-auto my-[100px] max-sm:my-10'}>
      <div
        className={'flex justify-between items-center flex-wrap max-lg:justify-center max-lg:items-center max-lg:text-center gap-y-10 max-md:mx-3'}>
        <BlockTitle title={t('Наши') + ' '} titleSpan={t('услуги')}
                    titleStyle={'text-6xl max-sm:text-5xl font-timesNewRomanBold text-titleDark'}
                    titleSpanStyle={'text-titleLactic'}></BlockTitle>
        <div className={'flex font-evolventaRegular text-lg max-sm:text-base'}>
          <button
            className={typeService === 'legal' ? 'border-b pr-5' : 'border-b border-titleLactic text-titleLactic transition-all pr-5'}
            onClick={() => dispatch(setTypeService('physical'))}>{t('Физическим лицам')}</button>
          <button
            className={typeService === 'physical' ? 'border-b pl-5' : 'border-b border-titleLactic text-titleLactic pl-5 transition-all'}
            onClick={() => dispatch(setTypeService('legal'))}>{t('Юридическим лицам')}</button>
        </div>
      </div>
      <div className={'mt-20 max-sm:mx-3 flex flex-col gap-y-20 pb-10 max-md:gap-y-10'}>
        {serviceList.serviceData.data?.map(item =>
          item.type === typeService && <ServicesElem key={item.id} {...item} />
        )}
      </div>
      <div className={'flex justify-center gap-x-10'}>
        {serviceList.serviceData.meta?.links?.map((item, i) => (
          <button onClick={() => item.url && handlePageChange(item.url)}
                  className={`rounded-full bg-titleLactic py-2 px-4 font-evolventaBold text-xl ${!item.active ? 'opacity-40 text-gray-600' : 'text-white'}`}
                  key={i}>{item.label.replace("Next", '').replace("Previous", '').replace("&raquo;", '\u003E').replace("&laquo;", "\u003C")}</button>
        ))
        }
      </div>
    </div>
  );
};

export default ServicesContent;