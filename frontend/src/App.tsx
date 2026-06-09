import { useAppStore } from "./store/appStore";

function App() {
  const { count, increment, decrement } = useAppStore();

  return (
    <div>
      <h1>RealCaptcha</h1>

      <h2>{count}</h2>

      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;