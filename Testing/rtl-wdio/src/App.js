import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppRouter from "./router/AppRouter";

function App() {
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");

  const onClick = () => setToggle((prev) => !prev);

  useEffect(() => {
    setTimeout(() => {
      setData({});
    }, 100);
  }, []);

  return (
    <div className="App">
      <h1 data-testid="value-elem">{value}</h1>
      {data && <div>data</div>}
      {toggle === true && <div data-testid="toggle-elem">toggle</div>}

      <h1>Hello world</h1>
      <button data-testid="toggle-btn" onClick={onClick}>
        Click me
      </button>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="input value..."
      />

      <AppRouter />
    </div>
  );
}

export default App;
