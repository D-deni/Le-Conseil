import Logo from "./elements/Logo.jsx";
import Navigation from "./elements/Navigation.jsx";
import Contacts from "./elements/Contacts.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const Header = ({dynamic}) => {
  const siteData = useSelector(state => state.site.siteData);
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation();
  useEffect(() => {
    if (window.screen.width > 1000) {
      setIsOpen(!isOpen)
    }
  }, [])
  return (
    <div className={'z-10 absolute mt-10 flex items-center container justify-between '}>
      <Logo logoStyle={'max-sm:mx-10'} subtitle={'text-subtitleDark '}/>
      <Navigation showBars={isOpen} dropdownCheck={true} onClick={() => setIsOpen(!isOpen)}/>
      <Contacts subtitle={t('Заказать звонок')}
                icon={true}
                lngFlag={true}
                onClick={() => setIsOpen(!isOpen)}
                iconStyle={'max-lg:hidden'}
                subtitleLinkType={'tel'}
                subtitleLink={siteData.phone}
                contactStyle={'max-lg:hidden'}
                subTitleStyle={'text-white underline text-lg font-evolventaRegular max-xl:text-base'}
                titleStyle={'text-titleLactic text-2xl font-evolventaBold max-xl:text-lg'}/>

    </div>
  );
};

export default Header;