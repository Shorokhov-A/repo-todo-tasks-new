import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, delete_projects}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={()=>delete_projects(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project} delete_projects={delete_project} />)}
        </table>
    )
}

export default ProjectList
