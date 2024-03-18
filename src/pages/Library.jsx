import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Spinner";
import ErrorPage from "./ErrorPage";

export default function Library() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const imgQuery = searchParams.get("q");
    const [ imgInputQuery, setImgInputQuery ] = useState(imgQuery || "");

    const vidQuery = searchParams.get("q");
    const [ vidInputQuery, setVidInputQuery ] = useState(vidQuery || "");

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
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 85vh;
        width: 100vw;

        h1 {
            margin: 0;
        }
    `

    const innerDivStyle = css`
        display: flex;
        flex-direction: row;
        justify-content: center;

        height: 65vh;
        width: 75vw;

        background-color: rgba(255,255,255,0.75);
        border-radius: 20px;
        border: 3px solid white;
        color: black;
    `

    const imgStyles = css`
        max-height: 55vh;
        max-width: 40vw;

        display: block;
        margin: auto;
    `

    return (
        <div css={outerDivStyle}>
            <h1>NASA's Photo Library</h1>

            <div css={innerDivStyle}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParams({ q: imgInputQuery})
                }}>
                    <input value={imgQuery} onChange={(e) => setImgInputQuery(e.target.value)} />
                    <button type="submit">Submit Query</button>
                </form>

                {isLoading && <Spinner />}
                {error && <ErrorPage />}
                {data?.collection && data.collection.items.length > 0 && (
                    <img src={data.collection.items[0].links[0].href} alt="NASA's library media" css={imgStyles} />
                )}
            </div>
        </div>
    )
}