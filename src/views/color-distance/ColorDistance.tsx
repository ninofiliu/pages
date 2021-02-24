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
  const columns = ['red', 'green', 'blue', 'hue', 'saturation', 'lightness']
    .map((name, index) => ({ name, index }));

  const [targetStr, setTargetStr] = useState<string>('');
  const [paletteStr, setPaletteStr] = useState<string>('');
  const [sortBy, setSortBy] = useState<number>(3);

  const target = computeColor(targetStr);
  const palette = paletteStr
    .split(',')
    .map((str) => ({ str, color: computeColor(str) }));
  const sortedPalette = [...palette].sort((p1, p2) => {
    const dist1 = Math.abs(p1.color[sortBy] - target[sortBy]);
    const dist2 = Math.abs(p2.color[sortBy] - target[sortBy]);
    return dist1 - dist2;
  });

  return (
    <div className="ColorDistance">
      <div className="in">
        <p>
          This tool allows to find the closest color among a color palette to a target color, with the distance being measured on any RGB or HSL channel. That can come in handy for example when you want to find what is the styleguide color that has the closest hue from a tint that is not in the styleguide.
        </p>
        <p>
          Target - any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">CSS color</a> is accepted
        </p>
        <input
          placeholder="#123456"
          value={targetStr}
          onChange={(evt) => setTargetStr(evt.target.value)}
        />
        <p>
          Palette - comma-separated list of any valid CSS color
        </p>
        <input
          placeholder="#123456,blue,rgb(10,20,30),hsl(10deg,75%,25%)"
          value={paletteStr}
          onChange={(evt) => setPaletteStr(evt.target.value)}
        />
        <p>
          Hue in <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/angle#units">deg</a>, saturation and lightness in <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/percentage">percentage</a>.
        </p>
      </div>
      <div className="out">
        <div />
        {columns.map(({ name, index }) => (
          <button
            type="button"
            onClick={() => setSortBy(index)}
            key={index}
            className={index === sortBy ? '--accent' : ''}
          >
            {name}
          </button>
        ))}
        <div>{targetStr}</div>
        {target
          .map((v, i) => ({ v, i }))
          .map(({ v, i }) => (
            <div key={i} className="--accent">{v}</div>
          ))}
        {sortedPalette.map((p) => (
          <>
            <div>{p.str}</div>
            {p.color
              .map((v, i) => ({ v, i }))
              .map(({ v, i }) => (
                <div
                  key={i}
                  className={i === sortBy ? '--accent' : ''}
                >
                  {v}
                </div>
              ))}
          </>
        ))}
      </div>
    </div>
  );
};
