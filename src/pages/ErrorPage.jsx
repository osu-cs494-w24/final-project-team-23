import { useRouteError } from "react-router-dom";
import { css } from "@emotion/react";

export default function ErrorPage() {
    const error = useRouteError();

    const outerDivStyles = css`
        display: flex;
        justify-content: center;
        align-items: center;

        height: 85vh;
        width: 100vw;
    `

    const innerDivStyles = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgba(255,255,255,0.75);
        color: black;

        border: 3px solid white;
        border-radius: 20px;

        height: 30vh;
        width: 50vw;
    `

    const imgStyles = css`
        max-height: 5vh;
        width: auto;

        display: block;
        margin: auto;
    `

    console.log("ErrorPage being called");

    return (
        <div css={outerDivStyles}>
            <div css={innerDivStyles}>
                <h1>Houston... We Have a Problem...</h1>
                <h3 css={{color: "red"}}>{error.statusText || error.message}</h3>
                <img src="/rocket.png" alt="Broken shuttle" css={imgStyles} />
            </div>
        </div>
    )
}