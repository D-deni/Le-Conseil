import {useState} from 'react';
import Logo from "./elements/Logo.jsx";
import Contacts from "./elements/Contacts.jsx";
import Socials from "../Other/Socials.jsx";
import FooterNavigation from "./FooterNavigation.jsx";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const Footer = () => {
  const {t} = useTranslation();
  const siteData = useSelector(state => state.site.siteData);
  const [navList, setNavList] = useState([
    {
      id: 0,
      name: 'Главная',
      link: '/'
    },
    {
      id: 1,
      name: 'О нас',
      link: '/about'
    },
    {
      id: 2,
      name: 'Команда',
      link: '/team'
    },
    {
      id: 3,
      name: 'Новости',
      link: '/news'
    },
    {
      id: 4,
      name: 'Контакты',
      link: '/contacts'
    },

  ])
  return (
    <div className={'bg-greenDark '}>
      <div className={'container mx-auto py-8 w-full'}>
        <div className={'flex max-lg:flex-col  items-center justify-between pb-8 border-b-[#252836] border-b'}>
          <Logo subtitle={'text-subtitleLactic'}/>
          <div className={'max-lg:justify-center max-lg:mt-6 max-lg:text-center'}>
            <nav
              className={'text-white flex gap-x-[48px] max-lg:flex-wrap max-lg:justify-center max-lg:gap-y-5 max-md:px-5 '}>
              {navList.map(navElem =>
                <Link to={navElem.link}
                      className={`flex gap-x-2 items-center font-evolventaRegular text-lg  `}
                      key={navElem.id}>
                  <p>{t(`${navElem.name}`)}</p>
                  {navElem.dropdown
                    ? <div className={'max-lg:hidden'}>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.5L4 3.5L7 0.5" stroke="#DCAB2F"/>
                      </svg>
                    </div>
                    : ''
                  }
                </Link>
              )}
            </nav>

          </div>
        </div>
        <div className={'flex max-lg:flex-col justify-between my-12'}>
          <div className={' flex flex-col max-lg:w-full  max-lg:items-center w-4/12 gap-y-11 max-lg:gap-y-6'}>
            <Contacts subtitle={siteData.email} subtitleLink={'info@le-conseil.com'} subtitleLinkType={'mailto'} icon={false}
                      subTitleStyle={'text-white text-lg font-evolventaBold tracking-wider'}
                      titleStyle={'text-white text-2xl font-evolventaBold'}/>
            <Socials/>
          </div>
          <div className={'w-full max-lg:mt-10'}>
            <FooterNavigation/>
          </div>
        </div>

      </div>
      <div className={'bg-black h-[70px] max-md:h-full text-white flex font-evolventaRegular text-lg max-md:py-6'}>
        <div className={'flex justify-between container items-center mx-auto max-md:flex-col break-words max-sm:text-sm'}>
          <p>© {new Date().toLocaleDateString().slice(6, 10)}, ООО «LE-CONSEIL». ИНН 310 000 721.</p>
          <Link className={'underline'} to={''}>{t('Политика конфиденциальности')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;