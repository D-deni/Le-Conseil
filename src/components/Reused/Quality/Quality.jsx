import React, {useEffect, useState} from 'react';
import QualityBlock from "./QualityBlock.jsx";
import Elipse from '/src/assets/img/icons/block/elipse.svg'
import Triangle from '/src/assets/img/icons/block/triangle.svg'
import Rectangle from '/src/assets/img/icons/block/rectangle.svg'
import Rhombus from '/src/assets/img/icons/block/rhombus.svg'
import Hex from '/src/assets/img/icons/block/hex.svg'
import {motion} from "framer-motion";
import { useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const Quality = ({containerStyles}) => {
  const site = useSelector(state => state.site)
  const [icons] = useState([Elipse, Triangle, Rectangle, Rhombus, Hex])
  const {t} = useTranslation()
  const textAnimation = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: custom =>({
      opacity: 1,
      x: 0,
      transition: {delay: custom * 2}
    })
  }
  return (
    <motion.div initial={'hidden'} viewport={{once: true}} whileInView={'visible'} className={containerStyles}>
      <div className={'container mx-auto pb-24 pt-16 max-md:py-10'}>
        <div className={'max-md:text-center mx-auto flex flex-col justify-center items-center mb-6'}>
          <motion.p custom={0.2} variants={textAnimation}
                    className={'mb-4 text-lg text-titleLactic font-evolventaRegular'}>{t('О компании Le-Conseil')}</motion.p>
          <motion.h3 custom={0.5} variants={textAnimation} className={'flex flex-col max-md:gap-x-4 max-sm:text-5xl max-md:flex-row max-md:justify-center text-6xl uppercase font-timesNewRomanBold text-titleDark'}>
                        {t('Пару Слов')}
                        </motion.h3>
        </div>
        <div className={'grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 items-center max-sm:mx-4'}>
          {site.siteData.few_words?.map((item, index) =>
            <QualityBlock key={item.id} en={item.en} uz={item.uz} ru={item.ru} icon={icons[index % icons.length]} ></QualityBlock>
            )
          }
        </div>
      </div>
    </motion.div>
  );
};

export default Quality;