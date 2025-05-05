import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Home, Auth, History} from './pages/pages.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import VideoPlay from './pages/VideoPlay.jsx'
import User from './pages/User.jsx'
import UserPage from './pages/UserPage.jsx'



/* const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path ='/' element={<App />}>
      <Route path ='' element={<Home/>}/>
      <Route path ='auth' element={<Auth/>}/>
      <Route path ='home' element = {<Home/>}/>
      <Route path ='/user/:id' element = {<User/>}/>
      <Route path ='history' element = {<Home isHistory={true}/>}/>
      <Route path ='/video/:id' element = {<VideoPlay/>}/>
      
      
    </Route>
  ])
) 
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Auth Layout */}
      <Route path="auth" element={<Auth />} />

      {/* UserPage Layout */}
      <Route path="/" element={<UserPage />}>
        <Route path="home" element={<Home />} />
        <Route path="user/:id" element={<User />} />
      </Route>

      {/* VideoPlay Layout */}
      <Route path="video/:id" element={<VideoPlay />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
 
)
