import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './composables/i18n.js'

import App from './App.jsx'
import About from "./pages/About.jsx";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Base from "./pages/Base.jsx";
import Services from "./pages/Services/index.jsx";
import Element from "./pages/Services/Element.jsx";
import Practice from "./pages/Practice/Practice.jsx";
import PracticeId from "./pages/Practice/PracticeId.jsx";
import Team from "./pages/Team/Team.jsx";
import {Provider} from "react-redux";
import store from "./store/index.js";
import NewsElem from "./pages/News/NewsElem.jsx";
import News from "./pages/News/News.jsx";
import Contacts from "./pages/Contacts.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Base/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/services',
        element: <Services/>,
      },
      {
        path: '/services/:serviceId',
        element: <Element/>
      },
      {
        path: '/practice',
        element: <Practice/>
      },
      {
        path: '/practice/:id',
        element: <PracticeId/>
      },
      {
        path: '/team',
        element: <Team/>
      },
      {
        path: '/news',
        element: <News/>
      },
      {
        path: '/news/:id',
        element: <NewsElem/>
      },
      {
        path: '/contacts',
        element: <Contacts/>
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
)

