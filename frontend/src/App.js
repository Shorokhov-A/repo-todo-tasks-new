import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    const users = [
      {
        'username': 'user_1',
        'first_name': 'Oliver',
        'last_name': 'Williams',
        'email': 'Oliver_William@gmail.com',
      },
      {
        'username': 'user_2',
        'first_name': 'Jack',
        'last_name': 'Gibson',
        'email': 'Jack_Gibson@gmail.com',
      },
      {
        'username': 'user_3',
        'first_name': 'Charley',
        'last_name': 'Martin',
        'email': 'Charley_Martin@gmail.com',
      },
      {
        'username': 'user_4',
        'first_name': 'Harry',
        'last_name': 'Jackson',
        'email': 'Harry_Jackson@gmail.com',
      },
      {
        'username': 'user_5',
        'first_name': 'Thomas',
        'last_name': 'Davis',
        'email': 'Thomas_Davis@gmail.com',
      },
    ]
    this.setState(
        {
          'users': users
        }
    )
  }

  render() {
    return (
        <div>
          <UserList users={this.state.users} />
        </div>
    )
  }
}

export default App;
