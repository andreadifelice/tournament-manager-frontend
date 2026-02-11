import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ThemeProvider from './context/ThemeContext'
import './index.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import TournamentPage from './pages/TournamentPage'
import NotFoundPage from './pages/NotFoundPage'
import GamePage from './pages/GamePage'


// creo una costante per poter navigare con le routes tra le pagine che vado a creare
const router = createBrowserRouter([
  {
    path: '/',
    element:<MainLayout/>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/teams',
        element:<TeamPage />,
      },
      {
        path: '/tournaments',
        element:<TournamentPage />,
      },
      {
        path:'/tournaments/:tournamentId/games',
        element:<GamePage />
      }
    ]
  },
  {
    path:'*',
    element: <NotFoundPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
  </StrictMode>,
)
