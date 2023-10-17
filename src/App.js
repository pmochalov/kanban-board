import React from "react";

import { Title } from "./components/TItle/Title";
import { Todos } from "./components/Todos/Todos";

function App() {
  return (
    <div className="container">
      <div className="row py-4">
        <div className="col">

          <Title />
          <Todos />
          
        </div>
      </div>
    </div>
  );
}

export default App;
