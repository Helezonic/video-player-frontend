import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Home, Auth} from './pages/pages.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'


const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path ='/' element={<App />}>
      <Route path ='' element={<Home/>}/>
      <Route path ='auth' element={<Auth/>}/>
      <Route path ='home' element = {<Home/>}/>
    </Route>
  ])
)

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
 
)
