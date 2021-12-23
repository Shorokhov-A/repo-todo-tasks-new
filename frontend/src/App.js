import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import MenuList from "./components/Menu.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects.js";
import ToDoList from "./components/ToDo.js";
import axios from "axios";
import {HashRouter, Route, Routes, useLocation} from "react-router-dom";

const NotFound404 = () => {
    let location = useLocation();
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

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
            <HashRouter>
                <MenuList />
                <Routes>
                    <Route path='/' element={<UserList users={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
                    <Route path='/todo' element={<ToDoList notes={this.state.todo} />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
            </HashRouter>
            <Footer />
        </div>
    )
  }
}

export default App;
