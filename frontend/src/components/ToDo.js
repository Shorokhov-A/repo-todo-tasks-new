import React from "react";

const ToDoItem = ({note}) => {
    return (
        <tr>
            <td>
                {note.project}
            </td>
            <td>
                {note.text}
            </td>
            <td>
                {note.created}
            </td>
            <td>
                {note.updated}
            </td>
            <td>
                {note.user.firstName}
                &nbsp;
                {note.user.lastName}
            </td>
            <td>
                <button type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({notes}) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Created at
            </th>
            <th>
                Updated at
            </th>
            <th>
                User
            </th>
            <th></th>
            {notes.map((note) => <ToDoItem note={note} />)}
        </table>
    )
}

export default ToDoList