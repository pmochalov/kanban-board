import React from "react";
import { useSelector } from "react-redux";

import { Title } from "./components/TItle/Title";
import { FormAddTodo } from "./components/FormAddTodo/FormAddTodo";
import { Todos } from "./components/Todos/Todos";

function App() {


  return (
    <div className="container">
      <div className="row py-4">
        <div className="col">

          <Title title="Канбан" />

          <FormAddTodo />

          <Todos />

        </div>
      </div>
    </div>
  );
}

export default App;
