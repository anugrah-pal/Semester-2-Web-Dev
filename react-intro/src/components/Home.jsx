import React from "react";

function Counter(props) {
  return <h1>{props.initialValue}</h1>;
}

function MultiCounter() {
  return (
    <div>
      <Counter initialValue={10} />
      <Counter initialValue={100} />
      <Counter initialValue={20} />
      <Counter initialValue={-100} />
    </div>
  );
}

const Home = () => {
  // js logic
  return <div><MultiCounter /></div>;
};

export default Home;