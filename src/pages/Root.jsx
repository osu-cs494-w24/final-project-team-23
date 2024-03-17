import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavLink, Outlet } from 'react-router-dom'
import APOD from './APOD.jsx'
import Earth from './Earth.jsx'


export default function Root() {
    return (
        <Earth/>
    )
}