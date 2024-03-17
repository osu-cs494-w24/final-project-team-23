import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { css } from '@emotion/react'


export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [inputQuery, setInputQuery] = useState(query || "")
    const [apod, setApod] = useState([])
    const [error, setError] = useState(null)

    const formStyles = css`
        input {
            width: 10vw;
            height: 3vh;
            margin-right: 10px;

            border-radius: 10px;
        }

        button {
            background-color: rgba(45,45,45,1);
            color: white;
            border: 2px solid white;
            border-radius: 10px;

            height: 4vh;
            width: 10vw;

            &:hover {
                background-color: rgba(70,70,70,1);
                color: red;
                border: 2px solid red;
                cursor: pointer;
            }
        }
    `

    const outerDivStyles = css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        height: 85vh;
        width: 100vw;
    `

    const innerDivStyles = css`
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: rgba(255,255,255,0.75);
        border: 3px solid white;
        border-radius: 20px;

        height: 75vh;
        width: 45vw;

        h3 {
            margin-bottom: 0;
            margin-top: 50px;
            font-size:35px;
        }

        p {
            margin-top: 0;
            margin-right: 10px;
            margin-left: 10px;
            font-size:25px;
            text-align: left;
            padding: 20px;
            line-height: 1.75rem;
        }

        img {
            display: block;
            margin: auto;
            max-width: 40vw;
            max-height:30vw;
        }
    `

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
        <div css={outerDivStyles}>
            <div css={innerDivStyles}>
                <h1>Astronomy Picture of the Day</h1>
                <form onSubmit={e => {
                    e.preventDefault()
                    setSearchParams({ q: inputQuery })
                }} css={formStyles}>
                    <input value={inputQuery} placeholder="YYYY-MM-DD" onChange={e => setInputQuery(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
                <h3>Description</h3>
                <p>{apod.explanation}</p>
            </div>

            <div css={innerDivStyles}>
                <h1>Date: {apod.date}</h1>
                <img src={apod.hdurl} alt="APOD" />
            </div>
        </div>
    )

}