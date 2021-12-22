import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import MenuList from "./components/Menu.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects.js";
import ToDoList from "./components/ToDo.js";
import axios from "axios";
import {HashRouter, Route, Routes, Link} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'todo': [],
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          const users = response.data.results
          this.setState(
              {
                'users': users
              }
              )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
          const projects = response.data.results
          this.setState(
              {
                'projects': projects
              }
              )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo')
        .then(response => {
          const notes = response.data.results
          this.setState(
              {
                'todo': notes
              }
              )
        }).catch(error => console.log(error))
  }

  render() {
    return (
        <div>
            <MenuList />
            <HashRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/todo'>TODO</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path='/' element={<UserList users={this.state.users} />} />
                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                    <Route exact path='/todo' element={<ToDoList notes={this.state.todo} />} />
                    <Route path='*' element={<h1>Страница не найдена.</h1>} />
                </Routes>
            </HashRouter>
            <Footer />
        </div>
    )
  }
}

export default App;
