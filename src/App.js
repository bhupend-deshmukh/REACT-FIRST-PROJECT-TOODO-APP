import "./App.css";
import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";

class App extends React.Component {
  state = {
    todos: [],
    storeValue: "",
    update: "",
    complated: [],
    status: "all",
  };

  addTodos = (e) => {
    this.setState({ storeValue: e.target.value });
  };

  showTodos = () => {
    const todosData = this.state.todos;
    let inputValue = this.state.storeValue.trim();
    if (inputValue.length == 0) {
      return;
    }
    todosData.push(inputValue);

    // console.log(todosData);
    let m = JSON.parse(localStorage.getItem("todos"));
    console.log(m, "local wala data hoye...");
    localStorage.setItem("todos", JSON.stringify(todosData));

    this.setState({ todos: todosData, storeValue: "" });
  };

  useEnter = (e) => {
    if (e.code === "Enter") {
      if (this.state.update == "") {
        return this.showTodos();
      }
      this.addUpdateData();
    }
  };

  deleteData = (e) => {
    let id = e.target.id;
    const AllTodos = this.state.todos;
    AllTodos.splice(id, 1);

    this.setState({ todos: AllTodos });
  };

  updateData = (e) => {
    let id = e.target.id;
    const AllTodos = this.state.todos;
    if (this.state.update != "") {
      document.getElementById("inp").style.backgroundColor = "#deb0b2";
    } else {
      this.setState({ storeValue: AllTodos[id], update: id });
      document.getElementById("inp").style.backgroundColor = "white";
      return;
    }
  };

  addUpdateData = () => {
    let inputValue = this.state.storeValue;
    let id = this.state.update;
    let AllTodos = this.state.todos;
    AllTodos.splice(parseInt(id), 1, inputValue);
    this.setState({ todos: AllTodos, storeValue: "", update: "" });
    document.getElementById("inp").style.backgroundColor = "white";
  };

  check = (e) => {
    let ind = parseInt(e.target.id);
    var comp = this.state.complated;
    if (!comp.includes(ind)) {
      comp.push(ind);
    } else {
      comp = comp.filter((item, index) => item != ind);
    }
    this.setState({ complated: comp });
  };

  render() {
    var t_st = this.state.todos.length > 0
    ? "To Do | " + this.state.todos.length
    : "To Do";
    document.title =t_st

    // Filters starts from here....
    var mytodos = this.state.todos;
    var status = this.state.status;
    var completed = this.state.complated;
    if (status == "all") {
      mytodos = mytodos;
    } else if (status == "pending") {
      mytodos = mytodos.filter((item, index) => !completed?.includes(index));
    } else {
      mytodos = mytodos.filter((item, index) => completed?.includes(index));
    }
    // Filters end here....
    return (
      <div className="container px-5">
        {
          <div className="header">
           {t_st}
          </div>
        }
        <div className="input-box d-flex">
          <input
            id="inp"
            autoFocus
            value={this.state.storeValue}
            placeholder="Write your todo here..."
            type="text"
            onChange={this.addTodos}
            onKeyDown={this.useEnter}
          />
          {this.state.update == "" ? (
            <button className="add px-3 py-1 btn btn-success" onClick={this.showTodos}>
              Add
            </button>
          ) : (
            <button className="btn btn-sm btn-warning me-1" onClick={this.addUpdateData}>update</button>
          )}
        </div>
        <ul class="nav nav-tabs mt-3 mb-3">
          <li class="nav-item cursor-pointer">
            <a
              onClick={() => this.setState({ status: "all" })}
              class={
                this.state.status == "all" ? "active nav-link" : "nav-link"
              }
              aria-current="page"
            >
              All
            </a>
          </li>
          <li class="nav-item cursor-pointer">
            <a
              onClick={() => this.setState({ status: "pending" })}
              class={
                this.state.status == "pending" ? "active nav-link" : "nav-link"
              }
              aria-current="page"
            >
              Pending
            </a>
          </li>
          <li class="nav-item cursor-pointer">
            <a
              onClick={() => this.setState({ status: "completed" })}
              class={
                this.state.status == "completed"
                  ? "active nav-link"
                  : "nav-link"
              }
              aria-current="page"
            >
              Completed
            </a>
          </li>
        </ul>
        {mytodos.length > 0 ? "" : <p>Todos is empty.....</p>}

        {mytodos.map((ele) => {
          var index = this.state.todos.indexOf(ele);
          return (
            <div
              className="d-flex justify-content-between border p-2 mb-1 display-class"
              id={index}
              onDoubleClick={this.updateData}
            >
              <div className="mb-1 mt-1">
                <input
                  type="checkbox"
                  className="me-2"
                  checked={this.state.complated.includes(index)}
                  onChange={this.check}
                  id={index}
                ></input>
                {ele}
                {""}
              </div>
              <div>
                <button id={index} onClick={this.updateData} className="btn btn-sm btn-warning me-1">
                  Update
                </button>
                <button id={index} onClick={this.deleteData} className="btn btn-sm btn-danger ml-2">
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {this.state.complated.map((ele, index) => (
          <div
            className="d-none d-flex justify-content-between border"
            id={index}
            onDoubleClick={this.updateData}
          >
            <div className="mb-1 mt-1">
              <input
                type="checkbox"
                className="me-2"
                checked={this.state.complated.includes(index)}
                onChange={this.check}
                id={index}
              ></input>
              {ele}
              {""}
            </div>
            <div className="mt-1">
              <button id={index} onClick={this.deleteData} className="delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
