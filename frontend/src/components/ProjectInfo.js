import React from "react";
import {useParams} from "react-router-dom";

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.link}</td>
            <td>{item.users}</td>
        </tr>
    )
}

const ProjectDetails = ({items}) => {
    let {id} = useParams();
    let filtered_items = items.filter((item) => item.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>LINK</th>
                <th>USERS</th>
            </tr>
            {filtered_items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}
export default ProjectDetails
