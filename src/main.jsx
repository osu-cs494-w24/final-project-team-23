import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Root from './pages/Root'
import FetchSearch from './pages/FetchSearch'
import ErrorPage from './pages/ErrorPage'

import App from './App'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    </React.StrictMode>,
)
