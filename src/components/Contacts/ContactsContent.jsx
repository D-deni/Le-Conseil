import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import site, {loadSiteContent} from "../../store/site.js";

const ContactsContent = () => {
  const {t, i18n} = useTranslation();
  const siteData = useSelector(state => state.site.siteData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSiteContent({page_name: 'main'}))
  }, [dispatch]);
  return (
    <div className={'flex justify-between flex-wrap max-lg:justify-center max-lg:text-center gap-y-10 mb-[80px]'}>
      <div className={'flex flex-col gap-y-6'}>
        <a href={'mailto:mail@leconseil.uz'}>
          <p className={'font-evolventaBold text-2xl'}>{siteData.email}</p>
          <p className={'underline font-evolventaRegular text-lg'}>{t('Напишите в почту!')}</p>
        </a>
        <a href={'tel:mail@leconseil.uz'}>
          <p className={'font-evolventaBold text-2xl'}>{'+' + siteData.phone}</p>
          <p className={'underline font-evolventaRegular text-lg'}>{t('Заказать обратный звонок')}</p>
        </a>
      </div>
      <div className={'flex flex-col gap-y-6 border-l border-r max-lg:border-none w-5/12 justify-center items-center'}>
        {siteData.socials?.map((item, i) => (
          <Link key={i} className={'flex items-center gap-x-4'} to={item.telegram}>
            <div className={'rounded-full px-1 py-2 border border-black'}>
              <svg className={' rounded-full'} width="30px" height="20px" viewBox="0 0 15 13" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 0.451669L12.7459 12.2192C12.7459 12.2192 12.4306 13.0351 11.5642 12.6438L6.36343 8.51443L6.33931 8.50226C7.04182 7.84905 12.4893 2.777 12.7274 2.54709C13.0959 2.19102 12.8671 1.97905 12.4392 2.24802L4.39259 7.53973L1.28823 6.45807C1.28823 6.45807 0.799693 6.27812 0.752695 5.88683C0.705078 5.4949 1.30431 5.28292 1.30431 5.28292L13.9599 0.141711C13.9599 0.141711 15 -0.331553 15 0.451669Z"
                  fill="black"/>
              </svg>
            </div>
            <p className={'text-2xl font-evolventaRegular'}>Telegram</p>
          </Link>
        ))}
        {siteData.socials?.map((item, i) => (
          <Link key={i} className={'flex items-center gap-x-4'} to={item.instagram}>
            <div className={'rounded-full px-1 py-2 border border-black'}>
              <svg width="30px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7439.000000)"
                     fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792"
                        id="instagram-[#167]">
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <p className={'text-2xl font-evolventaRegular'}>Instagram</p>
          </Link>
        ))}
        {siteData.socials?.map((item, i) => (
          <Link key={i} className={'flex items-center gap-x-4'} to={item.whatsApp}>
            <div className={'rounded-full px-1 py-2 border border-black'}>
              <svg width="30px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                  fill="#0F0F0F"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                      fill="#0F0F0F"/>
              </svg>
            </div>
            <p className={'text-2xl font-evolventaRegular'}>WhatsApp</p>
          </Link>
        ))}

      </div>
      <div className={'flex flex-col gap-y-6'}>
        <div>
          <p className={'font-evolventaBold text-2xl'}>{t('Режим работы')}:</p>
          {siteData.work_schedule.map((item, index) => (
            <p key={index}
               className={'font-evolventaRegular text-lg'}>{i18n.language === 'ru' ? item.ru : i18n.language === 'en' ? item.en : item.uz}</p>
          ))

          }
        </div>
        <div>
          <button
            className={'text-2xl font-evolventaRegular underline'}>{t('Скачать реквизиты компании')}</button>
        </div>
      </div>
    </div>
  );
};

export default ContactsContent;