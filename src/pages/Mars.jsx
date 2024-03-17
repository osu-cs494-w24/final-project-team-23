import { css } from "@emotion/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

    return (
        <>
            <div>
                <h1>Mars Rover Photos</h1>
            </div>

            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParams({ sol: solQuery, camera: cameraQuery});
                }}>
                    <label for="cameras">Choose a camera</label>
                    <select id="cameras" name="cameras" onChange={(e) => setCameraQuery(e.target.value)}>
                        <option value="fhaz">Front Hazard Avoidance Camera</option>
                        <option value={cameraQuery}>Rear Hazard Avoidance Camera</option>
                        <option value={cameraQuery}>Mast Camera</option>
                        <option value={cameraQuery}>Chemistry and Camera Complex</option>
                        <option value={cameraQuery}>Mars Hand Lens Imager</option>
                        <option value={cameraQuery}>Mars Descent Imager</option>
                        <option value={cameraQuery}>Navigation Camera</option>
                    </select>

                    <input value={solQuery} onChange={(e) => setSolQuery(e.target.value)} />
                    <button type="submit">Submit Data</button>
                </form>
            </div>
        </>
    )
}