import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Root from './pages/Root'
import APOD from './pages/APOD'
import Earth from './pages/Earth'
//import ErrorPage from './pages/ErrorPage'

import App from './App'

const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "APOD", element: <APOD /> },     // For APOD queries
            { path: "Earth", element: <Earth /> },     // For Earth landsat queries
            //{ path: "*", element: <ErrorPage /> },  // Catches all other paths 
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
