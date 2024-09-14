import './App.css'
import { createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom'
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
import Courses from './components/courses/Courses'
import { useContext } from 'react'
import { userLoginContext } from './contexts/userLoginContext'

function App({children}) {
  const { isLogin }=useContext(userLoginContext)

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
            path: '/login',
            element: isLogin ? <Navigate to="/profile" replace /> : <Login />
          },
          {
            path: '/register',
            element: isLogin ? <Navigate to="/profile" replace /> : <Register />
          },
          {
            path: '/liked',
            element: isLogin ? <Liked /> : <Navigate to="/login" replace />
          },
          {
            path: '/saved',
            element: isLogin ? <Saved /> : <Navigate to="/login" replace />
          },
          {
            path: '/profile',
            element: isLogin ? <Profile /> : <Navigate to="/login" replace />
          },
          {
            path: '/uploads',
            element: isLogin ? <Uploads /> : <Navigate to="/login" replace />
          },
          {
            path: '/materials/:domain',
            element: isLogin ? <CourseDetails /> : <Navigate to="/login" replace />
          },
          {
            path: '/courses',
            element: isLogin ? <Courses /> : <Navigate to="/login" replace />
          }
        ]
      }
  ])
  return (
    <RouterProvider router={browserRouter}>{children}</RouterProvider>
  )
}

export default App
