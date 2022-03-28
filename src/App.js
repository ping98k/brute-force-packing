import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { scanPackForce} from "./functions/scanPack";

const random = () => Math.floor(Math.random() * 20 + 20);

function App() {
  const [packed, setPacked] = useState([]);

  const randomBox =async ()=>{
    let boxList = [];
    for (let i = 0; i < 6; i++) {
      boxList.push({ w: random(), h: random() });
    }
    setPacked(await scanPackForce(100, 100, boxList));
  }

  useEffect(() => {
    randomBox()
  }, [setPacked]);

  return (
    <div style={{ display: "flex" }}>
      <Canvas items={packed} scale={10} />
      <div>
        <span>packed count:{packed.length}</span>
        <button onClick={() => randomBox()}>random</button>
      </div>
    </div>
  );
}

export default App;
