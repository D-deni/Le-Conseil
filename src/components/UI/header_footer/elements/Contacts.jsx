import PhoneSvg from '/src/assets/img/icons/phone.svg'
import Bars from '/src/assets/img/icons/bars.svg'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {supportedLngs} from "../../../../composables/i18n.js";
import {useEffect, useState} from "react";
const Contacts = ({
                    icon,
                    iconStyle,
                    subtitle,
                    titleStyle,
                    subTitleStyle,
                    subtitleLink,
                    subtitleLinkType,
                    contactStyle,
                    onClick,
                    lngFlag
                  }) => {
  const siteData = useSelector(state => state.site.siteData)
  const currentLocale = useState(localStorage.getItem('lang'))
  const changeLng = (e) => {
    i18n.changeLanguage(e.target.value)
    localStorage.setItem('lang', e.target.value)
  }
  const {t, i18n} = useTranslation();
  useEffect(() => {

  }, [currentLocale]);
  return (
    <div className={'flex items-center gap-x-4'}>
      {lngFlag &&
        <select value={i18n.language} onChange={(e) => changeLng(e)}
                className={'rounded-full uppercase p-2 bg-lactic text-gray-700 font-bold tracking-wider ml-4 max-sm:hidden'} name="" id="">
          {Object.entries(supportedLngs).map(([code, name]) => (
            <option key={code} value={code} selected={localStorage.getItem('lang') === code && code}>{name}</option>
          ))}
        </select>
      }
      <div className={'flex items-center'}>
        <div className={'hidden max-lg:block'} onClick={onClick}>
          {icon ? <img src={Bars} className={'mr-4 w-[40px] h-[40px]'} alt=""/> : ''}
        </div>
        <div className={iconStyle}>
          {icon ? <img src={PhoneSvg} className={'mr-4'} alt=""/> : ''}
        </div>
        <div className={contactStyle}>
          <p className={titleStyle}>{'+' + siteData.phone}</p>
          <a className={subTitleStyle} href={subtitleLinkType + ':' + subtitleLink}>{t(subtitle)}</a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;