import React from "react";
import './App.css';
import UserList from "./components/User.js";
import MenuList from "./components/Menu.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects.js";
import ToDoList from "./components/ToDo.js";
import ProjectDetails from "./components/ProjectInfo.js";
import axios from "axios";
import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";
import LoginForm from "./components/Auth.js";
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";

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
        'user_name': '',
        'user_id': '',
    }
  }

  set_token(token, userName, userId) {
      const cookies = new Cookies()
      cookies.set('token', token)
      cookies.set('user_name', userName)
      cookies.set('user_id', userId)
      this.setState({'token': token, 'user_name': userName, 'user_id': userId}, () => this.load_data())
  }

  is_authenticated() {
      return !!this.state.token
  }

  logout() {
      this.set_token('', '', '')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      const userName = cookies.get('user_name')
      const userId = cookies.get('user_id')
      this.setState({'token': token, 'user_name': userName, 'user_id': userId}, () => this.load_data())
  }

  get_token(username, password) {
      axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
          .then(response => {
              this.set_token(response.data['token'], response.data['user_name'], response.data['user_id'])
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
                'todo': notes.filter((item)=>item.isActive)
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

  delete_project(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
          .then(response => {
              this.setState({'projects': this.state.projects.filter((item)=>item.id !== id)})
          }).catch(error => console.log(error))
  }

  delete_todo(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
          .then(response => {
              this.setState({'todo': this.state.todo.filter((item)=>item.id !== id)})
          }).catch(error => console.log(error))
  }

  create_project(name, link, users) {
      // console.log(name, link, users)
      const headers = this.get_headers()
      const data = {'name': name, 'link': link, 'users': users}
      axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
          .then(response => {
              let new_project = response.data
              console.log(new_project)
              this.setState({'projects': [...this.state.projects, new_project]})
          }).catch(error => console.log(error))
  }

  create_todo(text, project) {
      const userId = this.state.user_id
      const headers = this.get_headers()
      const data = {'text': text, 'project': project, 'user': userId}
      axios.post('http://127.0.0.1:8000/api/todo/', data, {headers})
          .then(response => {
              this.load_data();
          }).catch(error => console.log(error))
  }

  render() {
    return (
        <div>
            <BrowserRouter>
                {this.is_authenticated() ? (
                    <MenuList
                        login={<button onClick={() => this.logout()}>Logout</button>}
                        username={<h4>{this.state.user_name} is logged in</h4>}
                    />
                ) : (
                    <MenuList
                        login={<Link to='/login'>Login</Link>}
                    />
                )}
                <Routes>
                    <Route path='/' element={<UserList users={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList users={this.state.users} projects={this.state.projects} delete_project={(id)=>this.delete_project(id)} />} />
                    <Route path='/projects/create' element={<ProjectForm users={this.state.users} create_project={(name, link, users)=>this.create_project(name, link, users)} />} />
                    <Route path='/todo' element={<ToDoList notes={this.state.todo} delete_todo={(id)=>this.delete_todo(id)} />} />
                    <Route path='/todo/create' element={<ToDoForm projects={this.state.projects} create_todo={(text, project)=>this.create_todo(text, project)} />} />
                    <Route path='/project/:id' element={<ProjectDetails users={this.state.users} items={this.state.projects} />} />
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
