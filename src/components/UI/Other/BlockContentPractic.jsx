import axios from "../../../composables/axios.js";
import {useTranslation} from "react-i18next";
import Modal from "./Modal.jsx";
import {Link} from "react-router-dom";
import Instagram from "../../../assets/img/icons/socials/instagram.svg";
import Facebook from "../../../assets/img/icons/socials/facebook.svg";
import Telegram from "../../../assets/img/icons/socials/telegram.svg";
import React, {useState} from "react";

const BlockContentPractic = ({props, titleAnimation, titleInBlock, blockStyle}) => {
  const {t, i18n} = useTranslation();
  const [modalOpen, setModalOpen] = useState(undefined)

  const openModal = (index) => {
    setModalOpen(index)
  };
  const closeModal = () => {
    setModalOpen(null)
  }
  return (
    <div className={`container mx-auto py-20 max-lg:px-3 max-lg:py-10`}>
      {!titleInBlock
        ? props.title?.map((el, index) => (
          <h3 key={index}
              className={'text-6xl uppercase font-timesNewRomanBold break-words max-md:text-4xl max-lg:text-center max-sm:text-3xl'}>{i18n.language === 'ru' ? el.ru : i18n.language === 'en' ? el.en : el.uz}</h3>
        ))
        : <></>
      }
      <div className={`${blockStyle} block`}>
        <div className={'w-6/12 break-words max-lg:w-full'}>
          <div>
            {titleInBlock
              ? props?.title?.map((el, index) =>
                <h3 key={index}
                    className={'font-evolventaBold text-xl '}>{i18n.language === 'en' ? el.en : i18n.language === 'ru' ? el.ru : el.uz}</h3>)
              : <></>
            }
            {props?.date
              ? <p className={'text-base text-titleLactic font-evolventaRegular'}>{props?.date}</p>
              : <></>
            }
          </div>
          <div className={'font-evolventaRegular text-[#777]'}>
            <div className={'text-lg flex flex-col gap-y-6 max-md:text-base'}>
              {props?.description?.map(el =>
                <p key={el.id}
                   className={''}>{i18n.language === 'en' ? el.en : i18n.language === 'ru' ? el.ru : el.uz}</p>
              )}
            </div>
            {props?.content?.map(item =>
              <div key={item.id}
                   dangerouslySetInnerHTML={{__html: i18n.language === 'en' ? item.en : i18n.language === 'ru' ? item.ru : item.uz}}/>
            )}
          </div>
        </div>
        {props?.image
          ? <div className={'w-6/12 h-full max-lg:w-full flex justify-center'}>
            <img src={axios.getUri() + 'storage/' + props?.image} alt="" className={'w-max rounded-lg'}/>
          </div>
          : <></>
        }
      </div>

      {props.members?.length > 0 &&
        <p
          className={'text-center mt-10 text-2xl tracking-wider font-evolventaBold'}>{t('Сотрудники учащиеся в проекте')}</p>
      }
      {props.members?.length > 0 &&
        <div className={'flex max-lg:justify-center flex-wrap w-full gap-y-6 gap-x-10 mt-10 p-4'}>
          {props.members?.map((employee, index) =>
            <>
              <div key={index} onClick={() => openModal(index)}
                   className={'flex cursor-pointer max-sm:flex-col shadow-lg w-[30%] max-lg:w-[45%] max-md:w-full gap-x-2 rounded-lg px-2 items-center text-center h-[180px] max-sm:py-4 max-sm:h-max'}>
                <div className={'max-md:mx-10 max-sm:mx-0'}>
                  <div className={'max-h-[100px] max-md:mx-auto w-[100px] h-[100px] border rounded-full'}>
                    <img className={'rounded-full mx-auto max-h-[100px] p-1'}
                         src={axios.getUri() + 'storage/' + employee.image} alt=""/>
                  </div>
                </div>
                <div className={'flex flex-col mx-auto gap-y-6 mt-2'}>
                  <p className={'font-evolventaBold text-lg'}>
                    {employee?.name}
                  </p>
                  <p className={'text-sm tracking-wider font-evolventaRegular'}>
                    {i18n.language === 'ru' ? employee?.position[0].ru : i18n.language === 'en' ? employee?.position[0].en : employee?.position[0].uz}
                  </p>
                </div>
              </div>
              <Modal key={index} isOpen={modalOpen === index} onClose={closeModal}>
                <div className={'flex max-lg:flex-wrap max-lg:justify-center max-lg:gap-y-6 gap-x-10'}>
                  <div className={'max-w-[300px] flex flex-col gap-y-4 max-sm:mt-6'}>
                    <img className={'rounded-lg'} src={axios.getUri() + 'storage/' + employee.image} alt=""/>
                    <div className={'flex gap-x-10 max-sm:gap-x-2 justify-center mt-[20px]'}>
                      {employee.links[0].instagram
                        ? <Link to={employee.links[0].instagram}>
                          <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
                            <img className={'w-[25px] h-[25px]'} src={Instagram} alt=""/>
                          </div>
                        </Link>
                        : <></>
                      }
                      {employee.links[0].facebook
                        ? <Link to={employee.links[0].facebook}>
                          <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
                            <img className={'w-[25px] h-[25px]'} src={Facebook} alt=""/>
                          </div>
                        </Link>
                        : <></>
                      }
                      {employee.links[0].telegram
                        ? <Link to={employee.links[0].telegram}>
                          <div className={'p-3 rounded-full flex items-center justify-center bg-titleDark'}>
                            <img className={'w-[25px] h-[25px]'} src={Telegram} alt=""/>
                          </div>
                        </Link>
                        : <></>
                      }
                    </div>
                  </div>
                  <div className={'text-left max-lg:text-center flex flex-col gap-y-10'}>
                    <div className={''}>
                      <p className={'font-timesNewRomanBold text-xl tracking-wider'}>{employee.name}</p>
                      <p
                        className={'text-[15px] tracking-wide text-gray-400'}>{employee.position?.map(e => i18n.language === 'en' ? e.en : i18n.language === 'ru' ? e.ru : e.uz)}</p>
                    </div>
                    <div className={'break-all'}>
                      <p
                        className={'break-words'}>{employee.description?.length > 0 ? employee.description?.map(e => i18n.language === 'en' ? e.en : i18n.language === 'ru' ? e.ru : e.uz) :
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
                        className={'font-normal text-[15px]'}>{employee.phone_number ? employee.phone_number : t('Отсутствует')}</span>
                      </p>
                      <p
                        className={'flex items-center py-4 border-b tracking-wider gap-x-2 font-bold'}>{t('Email') + ':'}<span
                        className={'font-normal text-[15px]'}>{employee.email ? employee.email : t('Отсутствует')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Modal>
            </>
          )
          }
        </div>
      }
    </div>
  );
};

export default BlockContentPractic;