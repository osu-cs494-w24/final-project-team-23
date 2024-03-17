import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export function Search(earthQuery) {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [setInputQuery] = useState(query || "")
    const [city, setCity] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function fetchSearchResults() {
            try {
                const response = await fetch(  // API call with key and input city
                    `https://api.api-ninjas.com/v1/geocoding?city=${earthQuery}`,
                    { headers: { 'X-Api-Key': 'cgpte0rR946R864KonJRNQ==Xb92LrF0CJhlZu0R' } },
                    { signal: controller.signal }
                )
                // API KEY - cgpte0rR946R864KonJRNQ==Xb92LrF0CJhlZu0R
                const responseBody = await response.json()
                console.log("== responseBody:", responseBody)
                console.log("== responseBody list:", responseBody.list)
                setError(null)
                setCity(responseBody[0]);
                console.log("city==",city)
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log(earthQuery)
                    console.log("HTTP request was aborted")
                    setError(err)
                } else {
                    console.error(err)
                    setError(err)
                }
            }
        }
            fetchSearchResults()    // Get the results if there is a query
        return () => controller.abort()
    }, [earthQuery])
    // Returns the found lat and lon for a given city
    return (
            [city.latitude, city.longitude]
        )

}

export default function SearchEarth() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [inputQuery, setInputQuery] = useState(query || "")
    const [earth, setEarth] = useState([])
    const [error, setError] = useState(null)
    const latitude = Search(inputQuery)[0]
    const longitude = Search(inputQuery)[1]


    useEffect(() => {
        const controller = new AbortController()
        async function fetchSearchResults() {
            try {
                const response = await fetch(  // API call with key and lat/lon
                    `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2018-01-01&dim=0.15&api_key=RcxPtX3fOecovjtNyb6h50kQbYp1gBcEgiiYr3TG`,
                    { signal: controller.signal }
                )
                // API KEY - cgpte0rR946R864KonJRNQ==Xb92LrF0CJhlZu0R
                console.log("latitude==", latitude)
                const responseBody = await response.json()
                console.log("== responseBody:", responseBody)
                console.log("== responseBody list:", responseBody.list)
                setError(null)
                setEarth(responseBody[0]);
                console.log("earth==", earth)
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log(inputQuery)
                    console.log("HTTP request was aborted")
                    setError(err)
                } else {
                    console.error(err)
                    setError(err)
                }
            }
        }
        fetchSearchResults()    // Get the results if there is a query
        return () => controller.abort()
    }, [inputQuery])
    //Displays the search box and button and the results of a successful search
    return (
        <div>
            <h1>Earth</h1>
            <h3>Search for a satellite image of a city</h3>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
            }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <ul>
                <li>
                    <p>City: {earth}</p>
                </li>
            </ul>
        </div>
    )

}