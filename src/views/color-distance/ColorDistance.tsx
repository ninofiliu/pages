import React, { useState } from 'react';
import './ColorDistance.scss';

type RGBA = [number, number, number]

const canvas = document.createElement('canvas');
canvas.width = 1;
canvas.height = 1;
const ctx = canvas.getContext('2d');

const computeRgba = (colStr: string): RGBA => {
  ctx.fillStyle = colStr;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
};

export default () => {
  const [colorStr, setColorStr] = useState<string>('');
  const [paletteStr, setPaletteStr] = useState<string>('');

  const [r, g, b] = computeRgba(colorStr);

  return (
    <div className="ColorDistance">
      <div className="in">
        <p>
          Color - any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">CSS color</a> is accepted
        </p>
        <input
          placeholder="#123456"
          value={colorStr}
          onChange={(evt) => setColorStr(evt.target.value)}
        />
        <p>
          Palette - comma-separated list of colors as above
        </p>
        <input
          placeholder="#123456,blue,rgb(10,20,30)"
          value={paletteStr}
          onChange={(evt) => setPaletteStr(evt.target.value)}
        />
      </div>
      <div className="out">
        {JSON.stringify({ r, g, b })}
      </div>
    </div>
  );
};
