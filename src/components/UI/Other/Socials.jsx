import {useState} from 'react';
import Instagram from '/src/assets/img/icons/socials/instagram.svg'
import Telegram from '/src/assets/img/icons/socials/telegram.svg'
import Facebook from '/src/assets/img/icons/socials/facebook.svg'
import Whatsapp from '/src/assets/img/icons/socials/whatsapp.svg'
import {Link} from "react-router-dom";
const Socials = () => {
  const [socials, setSocials] = useState([
    {
      id: 0,
      name: 'instagram',
      href: Instagram,
    },
    {
      id: 1,
      name: 'facebook',
      href: Facebook,
    },
    {
      id: 2,
      name: 'telegram',
      href: Telegram,
    },
    {
      id: 3,
      name: 'whatsapp',
      href: Whatsapp,
    }
  ])
  return (
    <div className={'flex items-center gap-x-6  '}>
      {socials.map(social=>
        <Link key={social.id} to={''} className={`bg-subtitleLactic w-[30px] h-[30px] rounded-full py-2 flex items-center justify-center`} >
          <img className={'fill-white'} src={social.href} alt=""/>
        </Link>
      )}
    </div>
  );
};

export default Socials;