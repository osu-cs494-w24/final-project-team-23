import { useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Spinner";
import ErrorPage from "./ErrorPage";

export default function Library() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const imgQuery = searchParams.get("q");
    const [ imgInputQuery, setImgInputQuery ] = useState(imgQuery || "");

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: [ "imgLibrary", imgQuery],
        queryFn: async () => {
            const response = await fetch(
                `https://images-api.nasa.gov/search?q=${imgInputQuery}`
            );
            return response.json();
        }
    });

    const outerDivStyle = css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        height: 85vh;
        width: 100vw;

        h1 {
            margin: 0;
        }
    `

    const innerDivStyle = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 75vh;
        width: 45vw;

        background-color: rgba(255,255,255,0.75);
        border-radius: 20px;
        border: 3px solid white;
        color: black;

        button {
            background-color: rgba(45,45,45,1);
            color: white;
            border: 2px solid white;
            border-radius: 20px;

            height: 5vh;
            width: 10vw;

            &:hover {
                background-color: rgba(70,70,70,1);
                color: red;
                border: 2px solid red;
                cursor: pointer;
            }
        }

        input {
            width: 15vw;
            height: 3vh;
            margin-right: 10px;
    
            border-radius: 10px;
        }
    `

    const imgStyles = css`
        max-height: 55vh;
        max-width: 40vw;

        display: block;
        margin: auto;
    `

    const gridContainerStyles = css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        margin-top: 5vh;

        height: 60%;
        width: 80%;

        border: 3px solid black;
        border-radius: 20px;
        background-color: rgb(70, 70, 70);
    `

    const innerGridStyles = css`
        display: grid;

        height: 18vh;
        width: 15vw;
        
        border: 3px solid black;
        border-radius: 20px;
        background-color: white;

        h3 {
            margin-bottom: 0;
            text-align: center;
            color: red;
        }
    `

    const iconStyles = css`
        height: 10vh;
        width: auto;

        display: block;
        margin: auto;
    `

    const linkStyles = css`
        color: black;
        text-decoration: none;

        &:hover {
            color: red;
            text-decoration: underline;
            font-style: italic;
        }
    `

    return (
        <div css={outerDivStyle}>
            <div css={innerDivStyle}>
                <h1>NASA's Photo Library</h1>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParams({ q: imgInputQuery})
                }}>
                    <input value={imgInputQuery} onChange={(e) => setImgInputQuery(e.target.value)} />
                    <button type="submit">Submit Query</button>
                </form>

                <div css={gridContainerStyles}>
                    <NavLink css={linkStyles} to="/library?q=apollo+11" onClick={() => setImgInputQuery("apollo 11")}>
                        <div css={innerGridStyles}>
                            <img src="../apollo.png" alt="Apollo 11" css={iconStyles} />
                            <h3>Apollo 11</h3>
                        </div>
                    </NavLink>

                    <NavLink css={linkStyles} to="/library?q=asteroid" onClick={() => setImgInputQuery("asteroid")}>
                        <div css={innerGridStyles}>
                            <img src="../asteroid.png" alt="Asteroid" css={iconStyles} />
                            <h3>Asteroid</h3>
                        </div>
                    </NavLink>

                    <NavLink css={linkStyles} to="/library?q=milky+way" onClick={() => setImgInputQuery("milky way")}>
                        <div css={innerGridStyles}>
                            <img src="../milky-way.png" alt="Milky Way" css={iconStyles} />
                            <h3>Milky Way</h3>
                        </div>
                    </NavLink>

                    <NavLink css={linkStyles} to="/library?q=black+hole" onClick={() => setImgInputQuery("black hole")}>
                        <div css={innerGridStyles}>
                            <img src="../black-hole.png" alt="Black Hole" css={iconStyles} />
                            <h3>Black Hole</h3>
                        </div>
                    </NavLink>
                </div>
            </div>

            <div css={innerDivStyle}>
                {isLoading && <Spinner />}
                {error && <ErrorPage />}
                {data?.collection && data.collection.items.length > 0 && (
                    <img src={data.collection.items[0].links[0].href} alt="NASA's library media" css={imgStyles} />
                )}
            </div>
        </div>
    )
}