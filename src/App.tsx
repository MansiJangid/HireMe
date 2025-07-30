import {createBrowserRouter, RouterProvider} from "react-router-dom" 
// import { Button } from './components/ui/button'
import './index.css'
import './App.css'
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/LandingPage"
import Onboarding from "./pages/Onboarding"
import JobList from "./pages/JobList"
import Jobs from "./pages/Jobs"
import MyJobs from "./pages/MyJobs"
import PostJob from "./pages/PostJob"
import SavedJob from "./pages/SavedJobs"
import { ThemeProvider } from "./components/theme-provider"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage />
      }, 
      {
        path:'/onboarding',
        element:<Onboarding />
      }, 
      {
        path:'/jobs',
        element:<JobList />
      }, 
      {
        path:'/jobs/:id',
        element:<Jobs />
      },
      {
        path:'/my-jobs',
        element:<MyJobs />
      }, 
      {
        path:'/post-job',
        element:<PostJob />
      }, 
      {
        path:'/saved-job',
        element:<SavedJob />
      }
    ]
  }
])

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>

   
  )
}

export default App

