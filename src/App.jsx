import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";
import Header from "./components/UI/header_footer/Header.jsx";
import Footer from "./components/UI/header_footer/Footer.jsx";
import {useEffect, useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {loadSiteContent} from "./store/site.js";
import Preloader from "./components/UI/Other/Preloader.jsx";

function App() {
  const ref = useRef()
  const site = useSelector(state => state.site);
  const dispatch = useDispatch();
  const location = useLocation()
  const [size, setSize] = useState({})
  useEffect(() => {
    setSize(window.screen.width)
  }, [size]);

  useEffect(() => {
    dispatch(loadSiteContent({page_name: location.pathname.split('/')[1] === '' || location.pathname.split('/')[1] === 'contacts' ? 'main' : location.pathname.split('/')[1]}))
  }, [dispatch])

  return (
   <div>
     { site.siteData.id ?
       <AnimatePresence>
         <div className={'flex flex-col justify-between'} ref={ref}>
           <div className={'container mx-auto'}>
             <Header dynamic={size}/>
           </div>
           <ScrollRestoration/>
           <Outlet/>
           <Footer/>
         </div>
       </AnimatePresence> :
       <Preloader>loading</Preloader>
     }
   </div>
  )
}

export default App
