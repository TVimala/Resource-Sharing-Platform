import './App.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Liked from './components/liked/Liked'
import Profile from './components/profile/Profile'
import Saved from './components/saved/Saved'
import RootLayout from './RootLayout'
import RoutingError from './components/RoutingError'
import Uploads from './components/uploads/Upload'
import CourseDetails from './components/courseDetails/CourseDetails'
function App({children}) {
  const browserRouter = createBrowserRouter([
      {
        path:'',
        element: <RootLayout />,
        errorElement: <RoutingError />,
        children:[
          {
            path:'',
            element:<Home/>
          },
          {
            path:'/login',
            element:<Login/>
          },{
            path:'/register',
            element:<Register/>
          },{
            path:'/liked',
            element:<Liked/>
          },{
            path:'/saved',
            element:<Saved/>
          },{
            path:'/profile',
            element:<Profile/>
          },{
            path:'/uploads',
            element:<Uploads/>
          },{
            path:'/materials/:domain',
            element:<CourseDetails/>
          }
        ]
      }
  ])
  return (
    <RouterProvider router={browserRouter}>{children}</RouterProvider>
  )
}

export default App
