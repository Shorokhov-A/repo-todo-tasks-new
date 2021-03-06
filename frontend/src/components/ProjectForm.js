import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'name': '', 'link': '', 'users': []}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let users = []
        for (let i=0; i<event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState(
            {
                'users': users,
            }
        );
    }

    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.link, this.state.users)
        event.preventDefault()
    }

    render() {
        return(
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div>
                    <label for="name">name</label>
                    <input type="text" name="name"
                           value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for="link">link</label>
                    <input type="text" name="link"
                           value={this.state.link}
                           onChange={(event)=>this.handleChange(event)}/>
                </div>
                <div>
                    <label for="users">users</label>
                    <select multiple name="users"
                            onChange={(event)=>this.handleUsersChange(event)}>
                        {this.props.users.map((user)=><option value={user.id}>{user.firstName} {user.lastName}</option>)}
                    </select>
                </div>
                <input type="submit" value="Save"/>
            </form>
        )
    }
}

export default ProjectForm
