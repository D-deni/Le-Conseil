import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import './ServiceBlock.css'
import {t} from 'i18next'
import {useSelector} from "react-redux";
import axios from "../../../composables/axios.js";
import {Link} from "react-router-dom";
import {motion} from 'framer-motion'
import {useTranslation} from "react-i18next";

const ServicesBlock = () => {
  const [mouseMove, setMouseMove] = useState(null)
  const nodeRef = useRef(null)
  const {i18n} = useTranslation();
  const services = useSelector(state => state.service)
  const typeService = useSelector(state => state.service.typeService)
  useEffect(() => {
  }, [typeService]);
  return (
    <div className={'flex flex-wrap gap-6 w-full justify-center items-center mx-auto'}>
      {services.serviceData.data?.map(item =>
        item.type === typeService &&
        <Link key={item.id} to={`/services/${item.id}`}
              className={`link-wrapper flex text-center text-white hover:opacity-100 transition-all items-center relative justify-center border rounded-md px-4 w-[410px] !h-[300px] uppercase break-words`}>
          <p className={`text-md font-evolventaRegular relative`}>{i18n.language === 'en' ? item.title[0].en : i18n.language === 'ru' ? item.title[0].ru : item.title[0].uz}</p>
          <div className={'image-wrapper'}>
            <div ref={nodeRef} className={''}>
              <div className={'absolute h-full w-full bg-black top-0 left-0 opacity-40 -z-10 rounded-md'}></div>
              <img className={'absolute h-full w-full rounded-md left-0 top-0 -z-20'}
                   src={axios.getUri() + 'storage/' + item.image} alt=""/>
            </div>
          </div>
        </Link>
      )}
      <Link to={'/services'}
            className={'w-[410px] h-[150px] flex items-center justify-center underline uppercase text-titleLactic text-lg hover:text-subtitleLactic'}>
        {t('Перейти в раздел')}
      </Link>
    </div>
  );
};

export default ServicesBlock;