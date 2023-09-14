import React from "react";
import { useSelector } from "react-redux";

import { Title } from "./components/TItle/Title";
import { Todos } from "./components/Todos/Todos";

function App() {


  return (
    <div className="container">
      <div className="row py-4">
        <div className="col">

          <Title title="Канбан" />

          <Todos />

        </div>
      </div>
    </div>
  );
}

export default App;
