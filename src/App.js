import { useRef, useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import * as THREE from "three";
import { FpsView } from "react-fps";

const imgs = [
  "cat.jpg",
  "dog.jpg",
  "eagle.jpg",
  "elephant.jpg",
  "grasshopper.jpg",
  "octopus.jpg",
  "owl.jpg",
  "panda.jpg",
  "squirrel.jpg",
  "tiger.jpg",
  "whale.jpg",
];

const nodeOptions = [
  50, 100, 200, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950, 1000, 1050,
  1100, 1150, 1200, 1250, 1300,
];

function genRandomTree(N = 300) {
  const images = [];
  for (let index = 0; index < N; index++) {
    const random = Math.floor(Math.random() * imgs.length);
    images.push(imgs[random]);
  }
  return {
    nodes: images.map((img, id) => ({ id, img })),
    links: [...Array(images.length).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };
}
export default function Home() {
  const [node, setNode] = useState(50);
  const data = genRandomTree(node);
  const fgRef = useRef();

  return (
    <div className="container">
      <FpsView width={150} height={0} left={20} top={20} />
      <form className="form-graph">
        <select onChange={(e) => setNode(e.target.value)}>
          {nodeOptions?.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </form>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
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
