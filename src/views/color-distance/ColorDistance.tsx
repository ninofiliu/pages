import React, { useState } from 'react';
import './ColorDistance.scss';

const computeColor = (colorStr: string): [number, number, number, number, number, number] => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  ctx.restore();
  ctx.fillStyle = colorStr;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;

  const x = nr - (ng + nb) / 2;
  const y = (Math.sqrt(3) / 2) * (ng - nb);
  const nh = Math.atan2(y, x);
  const h = Math.round(nh * (180 / Math.PI));

  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const nl = (max + min) / 2;
  const l = Math.round(100 * nl);

  const chroma = max - min;
  const ns = (nl === 0 || nl === 1) ? 0 : (chroma / (2 * (nl < 0.5 ? nl : (1 - nl))));
  const s = Math.round(100 * ns);

  return [r, g, b, h, s, l];
};

export default () => {
  const [colorStr, setColorStr] = useState<string>('');
  const [paletteStr, setPaletteStr] = useState<string>('');

  const color = computeColor(colorStr);
  const palette = paletteStr.split(',').map((c) => computeColor(c));

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
        {JSON.stringify({ color, palette })}
      </div>
    </div>
  );
};
