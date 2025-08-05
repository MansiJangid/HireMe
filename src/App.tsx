import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
import { ProtectedRoute } from "./components/protected-route"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element:
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
      },
      {
        path: '/jobs',
        element:
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
      },
      {
        path: '/jobs/:id',
        element:
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
      },
      {
        path: '/my-jobs',
        element:
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
      },
      {
        path: '/post-job',
        element:
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
      },
      {
        path: '/saved-jobs',
        element:
          <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute>
      }
    ]
  }
])

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>


  )
}

export default App

