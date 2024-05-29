import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
const Breadcrumbs = ({prevLink, prevLinkContent, activeLink, activeLinkContent, currentPage, currentPageContent}) => {
  const {t} = useTranslation()
  return (
    <div className={'font-evolventaRegular text-lg flex gap-x-6 absolute top-56 max-md:top-28 max-md:flex max-md:text-sm max-sm:hidden'}>
      <Link to={'/'} className={'text-[#797979]'}>{t('Главная')}</Link>
      <p className={'text-[#797979]'}>/</p>
      <Link to={activeLink} className={!currentPage ? 'text-titleLactic' : 'text-[#797979]'}>{activeLinkContent}</Link>
      {currentPage
        ? <div className={'flex gap-x-6'}>
          <p className={'text-[#797979]'}>/</p>
          <Link to={currentPage} className={'text-titleLactic'}>{currentPageContent}</Link>
        </div>
        : <></>
      }
    </div>
  );
};

export default Breadcrumbs;