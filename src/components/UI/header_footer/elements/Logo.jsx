import {Link} from "react-router-dom";
import LogoHeader from '/src/assets/img/logo.png'
const Logo = ({subtitle, logoStyle, sub}) => {
  return (
    <Link to={'/'} className={`${logoStyle} flex items-center gap-x-4`}>
      <img src={LogoHeader} alt=""/>
      <div>
        <p className={'text-titleLactic font-timesNewRomanBold tracking-widest uppercase text-3xl max-xl:text-xl max-sm:text-xl'}>Le<span
          className={'text-white'}>-Conseil</span>
        </p>
        <p className={`${subtitle} text-lg max-xl:text-base font-evolventaBold tracking-widest`}>LAW FIRM</p>
      </div>
    </Link>
  );
};

export default Logo;