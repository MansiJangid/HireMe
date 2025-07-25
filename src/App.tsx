import {createBrowserRouter, RouterProvider} from "react-router-dom" 
// import { Button } from './components/ui/button'
import './index.css'
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/LandingPage"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage />
      }
    ]
  }
])

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App

