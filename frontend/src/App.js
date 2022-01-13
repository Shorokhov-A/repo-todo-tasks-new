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
        'user': '',
    }
  }

  set_token(token,user) {
      const cookies = new Cookies()
      cookies.set('token', token)
      cookies.set('user', user)
      this.setState({'token': token, 'user': user}, () => this.load_data())
  }

  is_authenticated() {
      return !!this.state.token
  }

  logout() {
      this.set_token('', '')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      const user = cookies.get('user')
      this.setState({'token': token, 'user': user}, () => this.load_data())
  }

  get_token(username, password) {
      axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
          .then(response => {
              this.set_token(response.data['token'], response.data['user'])
          }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
      let headers = {
          'Content-Type': 'application/json'
      }

      if (this.is_authenticated()) {
          headers['Authorization'] = 'Token ' + this.state.token
      }
      return headers
  }

  load_data() {
      const headers = this.get_headers()
      axios.get('http://127.0.0.1:8000/api/users', {headers})
        .then(response => {
          const users = response.data.results
          this.setState(
              {
                'users': users
              }
              )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects', {headers})
        .then(response => {
          const projects = response.data.results
          this.setState(
              {
                'projects': projects
              }
              )
        }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
        })

    axios.get('http://127.0.0.1:8000/api/todo', {headers})
        .then(response => {
          const notes = response.data.results
          this.setState(
              {
                'todo': notes
              }
              )
        }).catch(error => {
        console.log(error)
        this.setState({'todo': []})
        })
  }

  componentDidMount() {
      this.get_token_from_storage()
  }

  render() {
    return (
        <div>
            <BrowserRouter>
                {this.is_authenticated() ? (
                    <MenuList
                        login={<button onClick={() => this.logout()}>Logout</button>}
                        username={<h4>{this.state.user} is logged in</h4>}
                    />
                ) : (
                    <MenuList
                        login={<Link to='/login'>Login</Link>}
                    />
                )}
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
