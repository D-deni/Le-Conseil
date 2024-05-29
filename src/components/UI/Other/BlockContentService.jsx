import axios from "../../../composables/axios.js";
import {useTranslation} from "react-i18next";

const BlockContentService = ({props, titleAnimation, titleInBlock, blockStyle}) => {
  const {i18n} = useTranslation();
  return (
    <div className={`container mx-auto py-20 max-lg:px-3 max-lg:py-10`}>
      {!titleInBlock
        ? <h3 className={'text-6xl uppercase font-timesNewRomanBold break-words max-md:text-4xl max-lg:text-center max-sm:text-3xl'}>{i18n.language === 'en' ? props.data?.title[0]?.en : i18n.language === 'uz' ? props.data?.title[0]?.uz : props.data?.title[0]?.ru}</h3>
        : <></>
      }
      <div className={`${blockStyle} block`}>
        <div className={'w-6/12 break-words max-lg:w-full'}>
          <div>
            {titleInBlock
              ? props.data?.title?.map((el, index) => (
                <h3 key={index}
                  className={'font-evolventaBold text-xl '}>{i18n.language === 'en' ? el.en : i18n.language === 'ru' ? el.ru : el.uz}</h3>
              ))
              : <></>
            }
            {props.data?.date
              ? <p className={'text-base text-titleLactic font-evolventaRegular'}>{props.data?.date}</p>
              : <></>
            }
          </div>
          <div className={'font-evolventaRegular text-[#777]'}>
            <div className={'text-lg flex flex-col gap-y-6 max-md:text-base'}>
              {props.data?.description?.map((el, index) =>
                <p key={index}  className={''}>{i18n.language === 'en' ? el?.en : i18n.language === 'ru' ? el?.ru : el?.uz}</p>
              )}
            </div>
            <ul className={'mt-4 pl-10 break-words list-disc flex flex-col gap-y-4 max-lg:hidden'}>
              {props.data?.content?.map((item, index) =>
                <li key={index}  className={''}>{i18n.language === 'en' ? item?.en : i18n.language === 'ru' ? item?.ru : item?.uz}</li>
              )}
            </ul>
          </div>
        </div>
        {props.data?.image
          ? <div className={'w-6/12 h-full max-lg:w-full flex justify-center '}>
            <img src={axios.getUri() + 'storage/' + props.data?.image} alt="" className={'w-max rounded-lg'}/>
          </div>
          : <></>
        }
      </div>
      <ul className={' pl-10 max-sm:pl-4 break-words list-disc hidden flex-col gap-y-4 max-lg:flex'}>
        {props.data?.content?.map((el, index) =>
          <li key={index} className={'w-full'}>{el.desc}</li>
        )}
      </ul>
    </div>
  );
};

export default BlockContentService;