import {animate, useMotionValue, motion, useTransform} from "framer-motion";
import {useTranslation} from "react-i18next";

const WhyUsElem = ({icon, title, subtitle, itemBg, num, titleElem}) => {
  const {i18n} = useTranslation()
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.floor)
  const anim = animate(count, num, {
    duration: 10
  });
  const blockAnim = {
    hidden: anim.pause,
    visible: anim.play,
    complete: anim.stop
  }

  return (
    <motion.div initial={'hidden'} whileInView={'visible'}
                className={`w-[230px] h-[200px] p-4 ${itemBg} rounded-lg flex flex-col justify-between`}>
      <img className={'mx-auto'} src={icon} alt=""/>
      <div className={'flex justify-center font-evolventaBold text-[40px] text-titleDark'}>
        {title && <p>{title}</p>}
        <motion.h4 whileInView={{x: 0, opacity: 1}} initial={{x: 0, opacity: 1}}
                   variants={blockAnim}>{rounded}</motion.h4>
        {titleElem && <p>{titleElem}</p>}
      </div>
      {subtitle?.map((item, id) => (
        <p key={id}
           className={'font-evolventaRegular text-subtitleLactic text-base break-words uppercase'}>{i18n.language === 'ru' ? item.ru : i18n.language === 'en' ? item.en : item.uz}</p>
      ))

      }
    </motion.div>
  );
};

export default WhyUsElem;