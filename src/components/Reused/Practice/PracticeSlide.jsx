import {Link} from "react-router-dom";
import axios from "../../../composables/axios.js";
import {useTranslation} from "react-i18next";

const PracticeSlide = ({props, descriptionStyle,linkUrl, pageUrl}) => {
  const {i18n } = useTranslation()
  return (
    <Link to={`/${pageUrl}/${linkUrl}`} draggable={false}
          className={'p-5 font-evolventaRegular hover:scale-105 transition-all duration-200 overflow-hidden mx-auto w-[300px] h-[384px] text-base border border-titleLactic rounded-[10px] select-none flex'}>
      <div>
        <img className={'w-full h-[200px] rounded-lg'} src={axios.getUri() + 'storage/' + props?.image} alt=""/>
        <div className={'pt-[30px] flex flex-col gap-y-3 '}>
          <p className={'text-titleLactic break-words'}>{props?.date}</p>
          {props.description?.map(el =>
            <p key={el.id} className={`${descriptionStyle} break-all`}>{i18n.language === 'en' ? el.en.length > 80 ? el.en.slice(0,80) + '...' : el.en : i18n.language === 'ru' ?  el.ru.length > 80 ? el.ru.slice(0, 80) + '...' : el.ru :  el.uz.length > 80 ? el.uz.slice(0, 80) + '...' : el.uz}</p>
          )
          }
        </div>
      </div>

    </Link>
  );
};

export default PracticeSlide;