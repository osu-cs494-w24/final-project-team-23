import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { css, Global } from '@emotion/react'

import Root from './pages/Root'
import APOD from './pages/APOD'
import Earth from './pages/Earth'
//import ErrorPage from './pages/ErrorPage'

import App from './App'

const queryClient = new QueryClient()

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Linden+Hill:ital@0;1&display=swap');
    html {
        font-family: 'Linden Hill', serif;
    }
    body {
        margin: 0px;
        padding: 0px;
    }
`

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "home", element: <App /> },
            { path: "apod", element: <APOD /> },     // For APOD queries
            { path: "earth", element: <Earth /> },     // For Earth landsat queries
            //{ path: "*", element: <ErrorPage /> },  // Catches all other paths 
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
