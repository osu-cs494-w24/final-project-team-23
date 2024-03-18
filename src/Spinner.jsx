/*
 * Spinner derived from https://tobiasahlin.com/spinkit/.
 */

import { css } from '@emotion/react';

export default function Spinner() {
  const skCubeGrid = css`
    width: 40px;
    height: 40px;
    margin: 100px auto;
  `;

  const skCube = css`
    width: 33%;
    height: 33%;
    background-color: #333;
    float: left;
    animation: skCubeGridScaleDelay 1.3s infinite ease-in-out;
  `;

  const skCubeDelay = (delay) => css`
    animation-delay: ${delay}s;
  `;

  return (
    <div css={skCubeGrid} className="sk-cube-grid">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          css={[skCube, skCubeDelay((index % 3) * 0.1 + Math.floor(index / 3) * 0.1 + 0.1)]}
          className={`sk-cube sk-cube${index + 1}`}
        />
      ))}
    </div>
  );
}

// Keyframes
const skCubeGridScaleDelay = css`
  @keyframes skCubeGridScaleDelay {
    0%, 70%, 100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }
`;
