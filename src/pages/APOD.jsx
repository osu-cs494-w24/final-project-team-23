import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [inputQuery, setInputQuery] = useState(query || "")
    const [apod, setApod] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function fetchSearchResults() {
            try {
                const response = await fetch(  // API call with key and input date
                    `https://api.nasa.gov/planetary/apod?api_key=RcxPtX3fOecovjtNyb6h50kQbYp1gBcEgiiYr3TG&date=${inputQuery}`,
                    { signal: controller.signal }
                )

                const responseBody = await response.json()
                console.log("== responseBody:", responseBody)
                console.log("== responseBody list:", responseBody.list)
                setError(null)
                setApod(responseBody);
                console.log(apod)
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
            <h1>APOD</h1>
            <h3>Search for the APOD on a day by searching a date in the YYYY-MM-DD format. If you do not enter a date,
            the image for today will be displayed.</h3>
                <form onSubmit={e => {
                    e.preventDefault()
                    setSearchParams({ q: inputQuery })
                }}>
                    <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <ul>
                <h1>Date: {apod.date}</h1>
                <img src={apod.hdurl} alt="APOD" />
                <p>Description: {apod.explanation}</p>
            </ul>
        </div>
    )

}