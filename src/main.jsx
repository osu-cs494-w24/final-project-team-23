import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { css, Global } from '@emotion/react'

import Root from './pages/Root'
import APOD from './pages/APOD'
import Earth from './pages/Earth'
import App from './App'
import Mars from './pages/Mars'
import ErrorPage from './pages/ErrorPage'
import Library from './pages/Library'

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
        errorElement: <Root><ErrorPage /></Root>,
        children: [
            { path: "home", element: <App /> },
            { path: "apod", element: <APOD /> },     // For APOD queries
            { path: "earth", element: <Earth /> },     // For Earth landsat queries
            { path: "mars", element: <Mars /> },         // Page for Mars queries
            { path: "library", element: <Library /> }
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
