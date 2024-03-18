import { NavLink, Outlet } from 'react-router-dom'
import { css } from '@emotion/react'


export default function Root(props) {
    const { children } = props;

    const footerStyles = css`
        background-color: rgb(45,45,45);
        color: white;

        height: 5vh;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: center;

        position: fixed;
        bottom: 0px;
        border-top: 3px inset white;

        img {
            max-height: 4vh;
            width: auto;
            padding-left: 20px;
        }
    `

    const headerStyles = css`
        background-color: rgb(45,45,45);
        color: white;

        height: 10vh;
        width: 100vw;

        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 3px inset white;

        nav {
            display: flex;
            flex: 1;
            align-items: center;
        }
    `

    const boxStyle = css`
        display: flex;
        flex: 1;
        justify-content: center;
    `

    const linkStyles = css`
        color: white;
        text-decoration: none;

        &:hover {
            color: red;
            text-decoration: underline;
            font-style: italic;
        }
    `

    const mainStyles = css`
        height: 85vh;
        width: 100vw;
        background-color: rgb(70, 70, 70);
    `


    return (
        <>
            <div css={headerStyles}>
                <nav>
                    <h1 css={boxStyle}><NavLink to="/home" css={linkStyles}>Space Explorer</NavLink></h1>
                    <h2 css={boxStyle}><NavLink to="/apod" css={linkStyles}>Picture of the Day</NavLink></h2>
                    <h2 css={boxStyle}><NavLink to="/earth" css={linkStyles}>Earth</NavLink></h2>
                    <h2 css={boxStyle}><NavLink to="/library" css={linkStyles}>Img/Vid Library</NavLink></h2>
                    <h2 css={boxStyle}><NavLink to="/mars" css={linkStyles}>Mars</NavLink></h2>
                </nav>
            </div>

            <main css={mainStyles}>{children || <Outlet />}</main>

            <footer css={footerStyles}>
                <p>Data powered by the NASA developer API</p>
                <img src="/public/nasalogo.png" alt="NASA logo" />
            </footer>
        </>
    )
}