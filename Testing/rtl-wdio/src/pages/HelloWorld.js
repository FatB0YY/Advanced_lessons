import React from "react";

const HelloWorld = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (value === "hello") {
      setVisible((prev) => !prev);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input onChange={onChange} id="search" type="text" />
      <button onClick={toggle} id="toggle">
        hello world
      </button>
      {visible ?? <h1 id="hello">hello world</h1>}
    </div>
  );
};

export default HelloWorld;
