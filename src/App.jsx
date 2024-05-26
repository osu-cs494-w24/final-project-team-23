import { css } from "@emotion/react"
import { NavLink } from "react-router-dom"

export default function App() {
    const outerDivStyles = css`
        display: flex;
        flex-direction: row;
    `

    const innerDivStyles = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin-left: 2vw;
        margin-right: 2vw;

        width: 46vw;
        height: 85vh;
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

    const cardStyle = css`
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        height: 10vh;
        width: 40vw;
        margin: 40px;

        background-color: rgba(255,255,255, 0.75);
        color: black;

        border: 3px solid white;
        border-radius: 20px;
    `

    const leftCardStyle = css`
        display: flex;
        flex-direction: column;
        align-items: center;

        height: 65vh;
        width: 40vw;

        color: black;
        background-color: rgba(255,255,255,0.75);

        border: 3px solid white;
        border-radius: 20px;

        p {
            padding: 10px;
            color: red;
            font-weight: 400;
        }
    `

    const iconStyles = css`
        max-height: 8vh;
        width: auto;
    `

    const imgStyles = css`
        max-height: 20vw;
        width: auto;

        transition: transform 1.0s;

        &:hover {
            transform: rotate(360deg);
        }
    `

    return (
        <div css={outerDivStyles}>
            <div css={innerDivStyles}>
                <div css={leftCardStyle}>
                    <h1>Welcome!</h1>
                    <p>
                        This is a final project for CS 494: Advanced Web Development. 
                        For this project, we derive our data from NASA's developer API to power our different pages. 
                        Stay awhile and enjoy!
                    </p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/800px-NASA_logo.svg.png" alt="NASA logo" css={imgStyles}/>
                </div>
            </div>

            <div css={innerDivStyles}>
                <div css={cardStyle}>
                    <img src="galaxy.png" alt="galaxy" css={iconStyles} />
                    <h1><NavLink to="/apod" css={linkStyles}>Astronomy Picture of the Day</NavLink></h1>
                </div>

                <div css={cardStyle}>
                    <h1><NavLink to="/earth" css={linkStyles}>Earth</NavLink></h1>
                    <img src="planet-earth.png" alt="earth" css={iconStyles}  />
                </div>

                <div css={cardStyle}>
                    <img src="media.png" alt="library" css={iconStyles}  />
                    <h1><NavLink to="/library" css={linkStyles}>NASA's Image and Video Library</NavLink></h1>
                </div>

                <div css={cardStyle}>
                    <h1><NavLink to="/mars" css={linkStyles}>Mars</NavLink></h1>
                    <img src="mars.png" alt="mars" css={iconStyles}  />
                </div>
            </div>
        </div>
    )
}
