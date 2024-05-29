import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Instagram from '/src/assets/img/icons/socials/instagram.svg'
import Telegram from '/src/assets/img/icons/socials/telegram.svg'
import Facebook from '/src/assets/img/icons/socials/facebook.svg'
import axios from "../../composables/axios.js";
import Modal from "../UI/Other/Modal.jsx";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion";

const TeamCard = (props, {flag}) => {
  const [scelet, setScelet] = useState([5])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {t, i18n} = useTranslation()
  const openModal = () => {
    setIsModalOpen(true)
  };
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className={'text-center relative'}>
      <div>

      </div>
      <div onClick={openModal} className={'max-md:w-full mx-auto relative flex justify-center cursor-pointer '}>
        <div className={'h-[500px]  max-sm:w-max max-[390px]:h-[350px]'}>
          {flag === 'page' ??
            <div className={'absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 rounded-3xl'}/>
          }
          <img className={'w-max h-full rounded-3xl'}
               src={axios.getUri() + 'storage/' + props?.image}
               alt=""/>
        </div>
      </div>
      <div className={'w-full mt-5'}>
        <p className={'font-evolventaBold text-titleDark uppercase text-xl'}>{props.name}</p>
        <p
          className={'font-evolventaRegular text-titleLactic text-base'}>{props.position.map(e => i18n.language === 'en' ? e.en : i18n.language === 'ru' ? e.ru : e.uz)}</p>
      </div>
      <div className={'flex gap-x-10 justify-center mt-[20px]'}>
        {props.links[0].instagram
          ? <Link to={props.links[0].instagram}>
            <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
              <img className={'w-[25px] h-[25px]'} src={Instagram} alt=""/>
            </div>
          </Link>
          : <></>
        }
        {props.links[0].facebook
          ? <Link to={props.links[0].facebook}>
            <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
              <img className={'w-[25px] h-[25px]'} src={Facebook} alt=""/>
            </div>
          </Link>
          : <></>
        }
        {props.links[0].telegram
          ? <Link to={props.links[0].telegram}>
            <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
              <img className={'w-[25px] h-[25px]'} src={Telegram} alt=""/>
            </div>
          </Link>
          : <></>
        }
      </div>
      <Modal mWidth={'w-10/12 max-sm:w-full'} isOpen={isModalOpen} onClose={closeModal}>
        <div className={'flex max-lg:flex-wrap max-lg:justify-center max-lg:gap-y-6 gap-x-10'}>
          <div className={'max-w-[400px] min-w-[350px] max-sm:min-w-[300px] flex flex-col gap-y-4 max-sm:mt-6'}>
            <img className={'rounded-lg'} src={axios.getUri() + 'storage/' + props.image} alt=""/>
            <div className={'flex gap-x-10 max-sm:gap-x-2 justify-center mt-[20px]'}>
              {props.links[0].instagram
                ? <Link to={props.links[0].instagram}>
                  <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
                    <img className={'w-[25px] h-[25px]'} src={Instagram} alt=""/>
                  </div>
                </Link>
                : <></>
              }
              {props.links[0].facebook
                ? <Link to={props.links[0].facebook}>
                  <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
                    <img className={'w-[25px] h-[25px]'} src={Facebook} alt=""/>
                  </div>
                </Link>
                : <></>
              }
              {props.links[0].telegram
                ? <Link to={props.links[0].telegram}>
                  <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
                    <img className={'w-[25px] h-[25px]'} src={Telegram} alt=""/>
                  </div>
                </Link>
                : <></>
              }
            </div>
          </div>
          <div className={'text-left max-lg:text-center  flex flex-col gap-y-10'}>
            <div className={''}>
              <p className={'font-timesNewRomanBold text-xl tracking-wider'}>{props.name}</p>
              <p
                className={'text-[15px] tracking-wide text-gray-400'}>{props.position?.map(e => i18n.language === 'en' ? e.en : i18n.language === 'ru' ? e.ru : e.uz)}</p>
            </div>
            <div className={'break-all'}>
              <p
                className={'break-words'}>{props.description?.length > 0 ? props.description?.map(e => i18n.language === 'en' ? e.en : i18n.language === 'ru' ? e.ru : e.uz) :
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad harum libero non porro? Ab ad
              alias assumenda at beatae deleniti dolorum earum eius eligendi fugit inventore iusto labore laudantium
              magnam minima, minus nihil nisi quasi quibusdam quisquam tempore unde veritatis vero. Asperiores corporis,
              eum expedita hic incidunt ipsum iste molestiae natus nisi non possimus quae, quia quidem sed sit velit
              voluptas! Cumque dicta et, illo ipsam optio quasi ratione repudiandae voluptas. A alias aliquam assumenda
              commodi cupiditate deleniti dignissimos distinctio dolor expedita, explicabo id natus, nemo placeat
              praesentium quasi rem sequi sint sunt tempora totam velit veniam voluptates, voluptatum.</span>}</p>
            </div>
            <div className={' font-timesNewRomanRegular'}>
              <p
                className={'flex items-center py-4 border-b border-t tracking-wider gap-x-2 font-bold'}>{t('Телефон') + ':'}<span
                className={'font-normal text-[15px]'}>{props.phone_number ? props.phone_number : t('Отсутствует')}</span>
              </p>
              <p className={'flex items-center py-4 border-b tracking-wider gap-x-2 font-bold'}>{t('Email') + ':'}<span
                className={'font-normal text-[15px]'}>{props.email ? props.email : t('Отсутствует')}</span></p>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamCard;