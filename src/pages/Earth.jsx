import { useState, useEffect } from 'react'
import { useSearchParams, NavLink, useParams } from 'react-router-dom'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { css } from '@emotion/react'

// Search() takes an input query of a City and uses that city to take data from the geocoding API, most importantly
// the latitude and longitude. It returns those coordinates back to the calling place
export function Search(inputQuery) {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [setInputQuery] = useState(query || "")
    const [city, setCity] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!inputQuery) return;
        const controller = new AbortController()
        async function fetchSearchResults() {
            try {
                const response = await fetch(  // API call with key and input city
                    `https://api.api-ninjas.com/v1/geocoding?city=${inputQuery}`,
                    { headers: { 'X-Api-Key': 'cgpte0rR946R864KonJRNQ==Xb92LrF0CJhlZu0R' } },
                    { signal: controller.signal }
                )
                const responseBody = await response.json()
                setError(null)
                console.log("city==", city)
                if (Array.isArray(responseBody) && responseBody.length > 0) {
                    setCity(responseBody[0]); // Assuming the first result is the desired one
                } else {
                    setError("No city data found");
                }
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
            fetchSearchResults()        // Get the results if there is a query
        return () => controller.abort()
    }, [inputQuery])
    // Returns the found lat and lon for a given city
        return (
            [city.latitude, city.longitude]
        )

}
// SearchEarth() takes the input for a city, and calls a function that calculates the Latitude and Longitude of the city
// in order to call the NASA Earth API with a latitude and longitude
export default function SearchEarth() {

    const formStyles = css`
        input {
            width: 10vw;
            height: 3vh;
            margin-right: 10px;
            font-size: 20px;
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
            margin-bottom: 20;
            margin-top: 50px;
            font-size:35px;
            color: #29348E;
        }

        h2 {
            margin-bottom: 0;
            margin-top: 35px;
            font-size:35px;
            color: #29348E;
        }


        h1 {
            margin-bottom: 0;
            margin-top: 50px;
            font-size:50px;
            color: #29348E;
        }

        a {
            color: #49B5C2;
        }

        a:hover {
            color: #FF0000;
        }

        p {
            margin-top: 20;
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

        li {
            list-style: none;
        }

        //scroll bar styling
        overflow: auto;

        ::-webkit-scrollbar {
            width: 10px;
          }
          
          /* Track */
          ::-webkit-scrollbar-track {
            display: none;
          }
           
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: rgb(70,70,70); 
            border-radius: 10px;
          }
          
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: rgb(45,45,45); 
          }
    `
    const [searchParams, setSearchParams] = useSearchParams()
    const { q } = useParams();
    const query = searchParams.get("q")
    const [inputQuery, setInputQuery] = useState(query || "")
    const [earth, setEarth] = useState([])
    const [error, setError] = useState(null)
    const latitude = Search(inputQuery)[0]
    const longitude = Search(inputQuery)[1]
    console.log("latitude ==", latitude)
    console.log("longitude ==", longitude)


    useEffect(() => {
        const controller = new AbortController()
        async function fetchSearchResults2() {
            try {
                const response = await fetch(  // API call with key and lat/lon
                    `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2018-01-01&api_key=RcxPtX3fOecovjtNyb6h50kQbYp1gBcEgiiYr3TG`,
                    { signal: controller.signal }
                )
                const responseBody = await response.json()
                setError(null)
                setEarth(responseBody[0]);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("HTTP request was aborted")
                    setError(err)
                } else {
                    console.error(err)
                    setError(err)
                }
            }
        }
        if (q) {
            fetchSearchResults2()
        }
        return () => controller.abort()
    }, [inputQuery])
    //Displays the search box and button and the results of a successful search
    return (
        <div> 
            <div css={outerDivStyles}>
                <div css={innerDivStyles}>
            <h1>Earth Satellite Imagery</h1>
            <h3>Search for a satellite image of a city:</h3>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
                    }} css={formStyles}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                        <button type="submit" onClick={(e) => {
                            {/* Reloads to the new Earth query page when a query is made  */ }
                            e.preventDefault();
                            window.location.reload();
                            window.location.href = `/earth?q=${inputQuery}`;
                        }}>Search</button>
                    </form> {/* Lists some popular cities with good satellite imagery */}
                    <h2>Popular Cities:</h2>
                    <h2><NavLink
                        to="/earth?q=Denver"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                            window.location.href = "/earth?q=Denver";
                        }}
                    >
                        Denver
                    </NavLink>
                    </h2>
                    <h2><NavLink
                        to="/earth?q=Miami"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                            window.location.href = "/earth?q=Miami";
                        }}
                    >
                        Miami
                    </NavLink>
                    </h2>
                    <h2><NavLink
                        to="/earth?q=Salt+Lake+City"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                            window.location.href = "/earth?q=Salt+Lake+City";
                        }}
                    >
                        Salt Lake City
                    </NavLink>
                    </h2>
                    <h2><NavLink
                        to="/earth?q=Houston"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                            window.location.href = "/earth?q=Houston";
                        }}
                    >
                        Houston
                    </NavLink>
                    </h2>
                    <h2><NavLink
                        to="/earth?q=San+Diego"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                            window.location.href = "/earth?q=San+Diego";
                        }}
                    >
                        San Diego
                    </NavLink>
                    </h2>
                </div>
                <div css={innerDivStyles}>
            <ul>
                <li>        {/* The NASA API call, which takes lat-lon and returns just a single satellite image as its result */}
                    <p><img src={`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2018-01-01&dim=0.15&api_key=RcxPtX3fOecovjtNyb6h50kQbYp1gBcEgiiYr3TG`} alt="Image Loading || Data Not Found" /></p>
                </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}