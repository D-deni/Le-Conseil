import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Close from '/src/assets/img/icons/close.svg'
import {CSSTransition} from "react-transition-group";
import './Navigation.css'
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {supportedLngs} from "../../../../composables/i18n.js";

const Navigation = ({dropdownCheck, onClick, showBars}) => {
  const nodeRef = useRef(null)
  const siteData = useSelector(state => state.site.siteData)
  const currentLocale = useSelector(state => state.site.lang)
  const changeLng = (e) => {
    i18n.changeLanguage(e.target.value)
    localStorage.setItem('lang', e.target.value)
    console.log(currentLocale)
  }
  const {t, i18n} = useTranslation();
  const [navList, setNavList] = useState([
    {
      id: 0,
      name: t("Главная"),
      link: '/'
    },
    {
      id: 1,
      name: t('Услуги'),
      link: '/services'
    },
    {
      id: 2,
      name: t('Опыт'),
      link: '/practice'
    },
    {
      id: 3,
      name: t('О нас'),
      link: '/about'
    },
    {
      id: 4,
      name: t('Команда'),
      link: '/team'
    },
    {
      id: 5,
      name: t('Новости'),
      link: '/news'
    },

  ])
  useEffect(() => {

  }, [currentLocale]);
  return (
    <CSSTransition nodeRef={nodeRef} in={showBars} timeout={300} classNames={'barsStyle'}
                   unmountOnExit>
      <div ref={nodeRef}
           className={'max-lg:fixed max-xl:gap-x-7 max-lg:bg-black max-lg:w-screen max-lg:left-0 max-lg:top-0 max-lg:justify-center max-lg:p-10 max-lg:backdrop-blur-[5px] max-lg:bg-opacity-40 max-lg:h-screen'}>
        <div className={'hidden max-lg:flex justify-end'}>
          <img className={'w-[60px] h-[60px] fill-white rotate-180'} src={Close} alt="" onClick={onClick}/>
        </div>
        <nav
          className={'text-white flex gap-x-[48px] max-xl:gap-x-[38px] max-lg:container max-lg:flex-col max-lg:gap-y-10 max-lg:w-full max-lg:mx-auto '}>
          {navList.map(navElem =>
            <Link to={navElem.link}
                  className={`flex gap-x-2 items-center hover:text-titleLactic hover:underline transition-all font-evolventaRegular max-xl:text-base text-lg max-xl:text-basem ax-lg:text-center max-lg:text-2xl max-lg:mx-auto max-lg:text-center`}
                  key={navElem.id}>
              <p>{t(navElem.name)}</p>
            </Link>
          )}
        </nav>
        <div
          className={'hidden text-white text-2xl max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:mx-auto max-lg:text-center max-lg:mt-20'}>
          <p>{'+' + siteData.phone}</p>
          <a href={'tel:+998900260001'}>{t('Заказать звонок')}</a>
        </div>
        <select value={i18n.language} onChange={(e) => changeLng(e)}
                className={'rounded-full uppercase absolute top-14 hidden max-sm:block p-2 bg-lactic text-gray-700 font-bold tracking-wider ml-4'}
                name="" id="">
          {Object.entries(supportedLngs).map(([code, name]) => (
            <option key={code} value={code} selected={localStorage.getItem('lang') === code && code}>{name}</option>
          ))}
        </select>
      </div>

    </CSSTransition>
  );
};

export default Navigation;