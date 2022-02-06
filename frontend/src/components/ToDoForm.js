import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'text': '', 'project': props.projects[0].id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.project)
        event.preventDefault()
    }

    render() {
        return(
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div>
                    <label for="text">text</label>
                    <input type="text" name="text"
                           value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for="project">project</label>
                    <select name="project"
                            onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((project)=><option value={project.id}>{project.name}</option>)}
                    </select>
                </div>
                <input type="submit" value="Save"/>
            </form>
        )
    }
}

export default ToDoForm
