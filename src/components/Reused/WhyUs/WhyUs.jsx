import BlockTitle from "../../UI/Other/BlockTitle.jsx";
import WhyUsElem from "./WhyUsElem.jsx";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const WhyUs = ({ bgShow, itemBg }) => {
  const site = useSelector(state => state.site)
  const {t, i18n} = useTranslation()
  return (
    <div className={`${bgShow}`}>
      <div className={bgShow ? 'bg-[#D2C5B3] bg-opacity-95 py-[100px] max-md:py-[40px]' : ''}>
        <div className={'container mx-auto text-center max-md:px-4'}>
          <div>
            {site.siteData.why_are_we?.map((item, index) => (
                <div key={index}>
                  {item.why_are_we_text.map((text, id) => (
                      <BlockTitle key={id} title={t('Почему мы?')}
                                  titleStyle={'font-timesNewRoman text-6xl font-timesNewRomanBold text-titleDark max-md:text-5xl'}
                                  subtitleStyle={'text-lg max-md:text-base font-evolventaRegular break-words pt-3'}
                                  subtitle={i18n.language === 'ru' ? text.ru: i18n.language === 'en' ? text.en: text.uz} />
                  ))
                  }
                </div>
            ))

            }
          </div>
          {site.siteData.why_are_we?.map(item =>
              <div key={item.id} className={'flex flex-wrap justify-center gap-x-10 gap-y-6 mt-[70px]'}>
                {item.ru.map((el, index) => (
                    <WhyUsElem key={index} num={Number(el.number.match(/\d+/g))} titleElem={el.number.replace(/\d+/g, '')} itemBg={itemBg} title={''}
                               subtitle={el.text} icon={item.icon}/>
                ))
                }
              </div>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default WhyUs;