import React from "react";

class ProjectSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'search_text': ''}
        this.props.filter_projects(this.state.search_text)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );
    }

    handleSubmit(event) {
        this.props.filter_projects(this.state.search_text)
        event.preventDefault()
    }

    render() {
        return(
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div>
                    <input type="text" name="search_text"
                           value={this.state.search_text}
                           onChange={(event) => this.handleChange(event)}/>
                    <input type="submit" value="Search"/>
                </div>
            </form>
        )
    }
}

export default ProjectSearchForm
