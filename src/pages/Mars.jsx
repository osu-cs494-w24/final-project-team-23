import { css } from "@emotion/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Spinner";
import ErrorPage from "./ErrorPage";

const API_KEY = 'RcxPtX3fOecovjtNyb6h50kQbYp1gBcEgiiYr3TG';

export default function Mars() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    var sol = searchParams.get("sol");
    var camera = searchParams.get("camera");
    const [ solQuery, setSolQuery ] = useState(sol || 0);
    const [ cameraQuery, setCameraQuery ] = useState(camera || "");

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: [ "marsRover", camera ],
        queryFn: async () => {
            const response = await fetch(
                `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solQuery}&camera=${cameraQuery}&api_key=${API_KEY}`
            );
            return response.json();
        }
    });

    const outerDivStyles = css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        height: 85vh;
        width: 100vw;
    `

    const innerDivStyles = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        background-color: rgba(255,255,255,0.75);
        border: 3px solid white;
        border-radius: 20px;

        height: 75vh;
        width: 45vw;
    `

    const imgStyles = css`
        display: block;
        margin: auto;
        max-height: 60vh;
        max-width: 40vw;
    `

    const formStyles = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text-align: center;

        select {
            margin-bottom: 10vh;
        }

        button {
            background-color: rgba(45,45,45,1);
            color: white;
            border: 2px solid white;
            border-radius: 20px;

            margin-top: 15vh;

            height: 7vh;
            width: 15vw;

            &:hover {
                background-color: rgba(70,70,70,1);
                color: red;
                border: 2px solid red;
                cursor: pointer;
            }
        }

        select, input {
            width: 15vw;
            height: 3vh;
            margin-right: 10px;
    
            border-radius: 10px;
        }
    `

    return (
        <div css={outerDivStyles}>
            <div css={innerDivStyles}>
                <h1>Mars Rover Photos</h1>

                <form css={formStyles} onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParams({ sol: solQuery, camera: cameraQuery});
                }}>
                    <label for="cameras"><h3>Choose a camera</h3></label>
                    <select id="cameras" name="cameras" onChange={(e) => setCameraQuery(e.target.value)}>
                        <option value="fhaz">Front Hazard Avoidance Camera</option>
                        <option value="rhaz">Rear Hazard Avoidance Camera</option>
                        <option value="mast">Mast Camera</option>
                        <option value="chemcam">Chemistry and Camera Complex</option>
                        <option value="mahli">Mars Hand Lens Imager</option>
                        <option value="mardi">Mars Descent Imager</option>
                        <option value="navcam">Navigation Camera</option>
                    </select>

                    <h3>Enter a Martian Sol</h3>
                    <input value={solQuery} onChange={(e) => setSolQuery(e.target.value)} />
                    <button type="submit">Submit Data</button>
                </form>
            </div>
            
            <div css={innerDivStyles}>
                {isLoading && <Spinner />}
                {error && <ErrorPage />}
                {data?.photos && data.photos.length > 0 && (
                    <img src={data.photos[0].img_src} alt="Mars Rover photo" css={imgStyles}/>
                )}
            </div>
        </div>
    )
}