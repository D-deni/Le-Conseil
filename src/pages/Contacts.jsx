import React from 'react';
import BlockTitle from "../components/UI/Other/BlockTitle.jsx";
import {motion} from "framer-motion";
import ContactsContent from "../components/Contacts/ContactsContent.jsx";
import ContactsMap from "../components/Contacts/ContactsMap.jsx";
import Breadcrumbs from "../components/UI/Other/Breadcrumbs.jsx";
import {useTranslation} from "react-i18next";

const Contacts = () => {
  const {t} = useTranslation()
  return (
    <motion.div initial={{ y: -20, opacity: 0.8}}
                animate={{ y: 0, opacity: 1 }}
                transition={{duration: 0.7,ease: [0.6, -0.05, 0.01, 0.99]}}>
      <header className={'bg-news bg-center bg-no-repeat bg-black max-lg:bg-center bg-cover'}>
        <div className={'backdrop-invert-0 bg-black/70'}>
          <div
            className={'container mx-auto pt-60 pb-20 max-lg:py-72 max-md:pt-40 max-md:pb-10 max-md:py-0 max-md:px-4 text-white'}>
            <Breadcrumbs prevLinkContent={t('Главная')} activeLink={'/contacts'} activeLinkContent={t('Контакты')} currentPage={false}/>
            <div className={'text-center w-10/12 max-lg:w-full break-words mx-auto '}>
              <BlockTitle title={t('Контакты')}
                          titleStyle={'text-5xl max-md:text-3xl max-sm:text-2xl font-timesNewRomanBold my-12 max-md:my-8 tracking-wider'}
                          titleAnimation={true}
                          aboveStyle={'text-xl max-md:text-lg font-evolventaRegular uppercase text-titleLactic'}
              />
            </div>
          </div>
        </div>
      </header>
      <section className={'container mx-auto my-[80px] px-10'}>
        <ContactsContent/>
        <ContactsMap/>
      </section>
    </motion.div>
  );
};

export default Contacts;