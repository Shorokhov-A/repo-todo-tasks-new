import React from "react";
import {Link} from "react-router-dom";

function getUserName(users, id) {
    let user = users.find((user)=>user.id === id)
    return `${user.firstName} ${user.lastName}`
}

const ProjectItem = ({project, delete_project, users}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users.map((item)=><p>{getUserName(users, item)}</p>)}
            </td>
            <td>
                <button onClick={()=>delete_project(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project, users}) => {
    return (
        <div>
        <table>
            <th>
                Name
            </th>
            <th>
                Link
            </th>
            <th>
                Users
            </th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} delete_project={delete_project} users={users} />)}
        </table>
        <Link to={'/projects/create'}>Create</Link>
        </div>
    )
}

export default ProjectList
