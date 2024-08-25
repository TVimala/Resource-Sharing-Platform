import './App.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import RootLayout from './RootLayout'
import RoutingError from './components/RoutingError'
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
          }
        ]
      }
  ])
  return (
    <RouterProvider router={browserRouter}>{children}</RouterProvider>
  )
}

export default App
