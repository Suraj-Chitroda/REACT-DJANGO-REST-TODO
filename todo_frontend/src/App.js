import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    }
  }

  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        title: todoValue,
      }

      axios.post('http://localhost:8000/api/todos/', newItem).then(res => this.refreshList()).catch(err => console.log(err));
      // const list = [...this.state.list]
      // list.push(newItem);
      this.setState({ newItem: "" });

    }
  }

  refreshList() {
    console.log('Starting refresh');
    axios.get('http://localhost:8000/api/todos/?format=json')
      .then(res => this.setState({ list: res.data }))
      .catch(err => console.log(err));
    console.log('Done refresh');
  }

  deleteItem(id) {
    // const list = [...this.state.list];
    // const updlist = list.filter(item => item.id !== id);
    // this.setState({ list: updlist });

    axios.delete('http://localhost:8000/api/todos/' + id)
      .then(res => this.refreshList())
      .catch(err => console.log(err));

  }

  updateInput(input) {
    console.log(input)
    this.setState({ newItem: input });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    return (
      <header className="App-header">
        <div className="App">
          <img src={logo} height="150" width="150" alt="hello" className="App-logo" />
          <h1 className="App-title">TODO App</h1>
          <p className="App-p1">Add any item...</p>
          <input type="text"
            placeholder="Enter Todo"
            className="input-text"
            required
            value={this.state.newItem}
            onChange={e => this.updateInput(e.target.value)}
          />
          <button className="add-btn" id="add"
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
          >Add</button>
          <div className="lst">
            <ul type="none" >
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {/* <input
                      type="checkbox"
                      name="isdone"
                      checked={item.isDone}
                      onChange={() => { }}
                    /> */}
                    {item.title}
                    <button
                      className="del-btn"
                      onClick={() => this.deleteItem(item.id)}
                    >Delete</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default App;