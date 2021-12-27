import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import MenuList from "./components/Menu.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects.js";
import ToDoList from "./components/ToDo.js";
import ProjectDetails from "./components/ProjectInfo.js";
import axios from "axios";
import {BrowserRouter, Route, Routes, useLocation, Link} from "react-router-dom";
import LoginForm from "./components/Auth.js";
import Cookies from 'universal-cookie';

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
        'token': '',
    }
  }

  set_token(token) {
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token})
  }

  is_authenticated() {
      return this.state.token != ''
  }

  logout() {
      this.set_token('')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token': token})
  }

  get_token(username, password) {
      axios.post('http://127.0.0.1:8000/api/jwt-token/', {username: username, password: password})
          .then(response => {
              this.set_token(response.data['token'])
          }).catch(error => alert('Неверный логин или пароль'))
  }

  load_data() {
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

  componentDidMount() {
      this.get_token_from_storage()
      this.load_data()
  }

  render() {
    return (
        <div>
            <BrowserRouter>
                <MenuList />
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                <Routes>
                    <Route path='/' element={<UserList users={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
                    <Route path='/todo' element={<ToDoList notes={this.state.todo} />} />
                    <Route path='/project/:id' element={<ProjectDetails items={this.state.projects} />} />
                    <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    )
  }
}

export default App;
