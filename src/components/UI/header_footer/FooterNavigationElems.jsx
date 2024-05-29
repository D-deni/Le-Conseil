import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const FooterNavigationElems = ({name, legal, legalTwo, service, linkStyle, listStyle}) => {
  const {i18n} = useTranslation()
  return (
    <ul className={'flex flex-wrap max-sm:items-center gap-y-[10px] max-sm:gap-y-4'}>{service.title?.map(item =>
      <Link key={item.id} to={`services/${service.id}`} className={linkStyle}>{i18n.language === 'ru' ? item.ru : i18n.language === 'en' ? item.en : item.uz}</Link>
    )}
    </ul>
  );
};

export default FooterNavigationElems;