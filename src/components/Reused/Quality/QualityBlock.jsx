import {useTranslation} from "react-i18next";

const QualityBlock = ({en, uz, ru, icon}) => {
  const {i18n} = useTranslation();
  const data = i18n.language === 'en' ? en : i18n.language === 'ru' ? ru : uz;
  return (
    <div className={'flex flex-col gap-y-3 h-[200px] bg-lightLactic rounded-xl p-8 max-sm:p-5'}>
      <div>
        <img src={icon} alt=""/>
      </div>
      <div>
        {data?.map(el =>
          <div key={el.id}>
            <h4 key={el.id} className={'font-evolventaBold text-lg text-titleDark'}>{el.title}</h4>
            <p key={el.id} className={'text-base font-evolventaRegular text-[#222] break-words '}>{el.text}</p>
          </div>
        )
        }

      </div>
    </div>
  );
};

export default QualityBlock;