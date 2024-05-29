import {useEffect, useState} from 'react';
import FooterNavigationElems from "./FooterNavigationElems.jsx";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {loadService} from "../../../store/service.js";

const FooterNavigation = () => {
  const dispatch = useDispatch();
  const serviceData = useSelector(state => state.service)
  useEffect(() => {
    dispatch(loadService({page: 1, limit: 10}))
  }, [dispatch]);
  const {t} = useTranslation()
  return (
    <div
      className={'flex flex-col gap-y-10 max-md:flex-wrap max-md:gap-y-10 max-md:mx-4 justify-between gap-x-32 max-lg:gap-x-20 w-full max-md:w-auto text-white '}>
      <p className={'text-lg font-evolventaBold max-sm:text-center '}>{t('Услуги')}</p>
      <div className={'flex flex-wrap gap-x-10 gap-y-10'}>
        {serviceData.serviceData?.data?.map((item, i) => (
          <div key={i} className={'flex flex-wrap'}>
            <FooterNavigationElems key={i} service={item}
                                   linkStyle={'break-words font-evolventaRegular text-base tracking-wider hover:text-gray-400 transition-all hover:underline'}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterNavigation;