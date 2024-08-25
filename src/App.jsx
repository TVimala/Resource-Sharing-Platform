import './App.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/home/Home'
import RootLayout from './RootLayout'

function App({children}) {
  const browserRouter = createBrowserRouter([
      {
        path:'',
        element: <RootLayout />,
        children:[
          {
            path:'',
            element:<Home/>
          }
        ]
      }
  ])
  return (
    <RouterProvider router={browserRouter}>{children}</RouterProvider>
  )
}

export default App
