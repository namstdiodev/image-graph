import { useRef, useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import * as THREE from "three";
import { FpsView } from "react-fps";

const imgs = Array.from(Array(19).keys()).map(
  (item) => `human_${item + 1}.jpg`
);
const nodeOptions = [
  50, 100, 200, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950, 1000, 1050,
  1100, 1150, 1200, 1250, 1300, 3000, 4000, 5000, 7500, 10000,
];

function genRandomTree(N = 300, L = 50) {
  const images = [];
  for (let index = 0; index < N; index++) {
    const random = Math.floor(Math.random() * imgs.length);
    images.push(imgs[random]);
  }
  return {
    nodes: images.map((img, id) => ({ id, img })),
    links: [...Array(parseInt(L)).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };
}

export default function Home() {
  const [node, setNode] = useState(50);
  const [line, setLine] = useState(50);
  const [lineColor, setLineColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(1)
  const data = genRandomTree(node, line);
  const fgRef = useRef();
  return (
    <div className="container">
      <FpsView width={150} height={0} left={20} top={20} />
      <form className="form-graph">
        <div className="field">
          <p>Node</p>
          <select onChange={(e) => setNode(e.target.value)}>
            {nodeOptions?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Line</p>
          <select onChange={(e) => setLine(e.target.value)}>
            {nodeOptions?.map(
              (item) =>
                item <= node && (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
            )}
          </select>
        </div>
        <div>
          <p>Line Color</p>
          <input
            value={lineColor}
            onChange={(e) => setLineColor(e.target.value)}
            type="color"
          />
        </div>
        <div>
          <p>Line Width</p>
          <input
            value={lineWidth}
            onChange={(e) => setLineWidth(Math.abs(e.target.value))}
            type="number"
          />
        </div>
      </form>
      <ForceGraph3D
        ref={fgRef}
        backgroundColor="#fff"
        linkColor={() => lineColor}
        graphData={data}
        linkWidth={parseInt(lineWidth)}
        nodeThreeObject={({ img }) => {
          const imgTexture = new THREE.TextureLoader().load(`imgs/${img}`);
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12);
          return sprite;
        }}
      />
    </div>
  );
}
