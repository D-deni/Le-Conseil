import React, {useMemo, useState} from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';

const ContactsMap = () => {
  const [zoom, setZoom] = useState(9)
  const mapState = useMemo(
    ()=>({center: [55,75, 37.57], zoom}),
    [zoom]
  )
  return (
    <div className={'w-full h-full mx-auto flex justify-center rounded-full'}>
      <YMaps>
        <Map className={'w-[1280px]  h-[500px] rounded-full'} defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
      </YMaps>
    </div>
  );
};

export default ContactsMap;