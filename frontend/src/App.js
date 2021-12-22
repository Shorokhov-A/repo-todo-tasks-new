import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import MenuList from "./components/Menu.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects.js";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        // 'projects': [],
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

    // axios.get('http://127.0.0.1:8000/api/projects')
    //     .then(response => {
    //       const projects = response.data.result
    //       this.setState(
    //           {
    //             'projects': projects
    //           }
    //           )
    //     }).catch(error => console.log(error))
  }

  render() {
    return (
        <div>
            <MenuList />
            <UserList users={this.state.users} />
            {/*<ProjectList projects={this.state.projects} />*/}
            <Footer />
        </div>
    )
  }
}

export default App;
