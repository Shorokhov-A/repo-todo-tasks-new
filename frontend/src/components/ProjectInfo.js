import React from "react";
import {useParams} from "react-router-dom";

function getUserName(users, id) {
    let user = users.find((user)=>user.id === id)
    return `${user.firstName} ${user.lastName}`
}

const ProjectItem = ({item, users}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.link}</td>
            <td>{item.users.map((item)=><p>{getUserName(users, item)}</p>)}</td>
        </tr>
    )
}

const ProjectDetails = ({items, users}) => {
    let {id} = useParams();
    let filtered_items = items.filter((item) => item.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>LINK</th>
                <th>USERS</th>
            </tr>
            {filtered_items.map((item) => <ProjectItem users={users} item={item} />)}
        </table>
    )
}
export default ProjectDetails
