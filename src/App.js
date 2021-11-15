import Canvas from "./Canvas";

function App() {
  return (
    <div>
      <Canvas
        items={[
          { x: 10, y: 20, w: 50, h: 100 },
          { x: 100, y: 100, w: 50, h: 100 },
        ]}
      />
    </div>
  );
}

export default App;
