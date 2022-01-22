import React from "react";

const ToDoItem = ({note, delete_todo}) => {
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
                <button onClick={()=>delete_todo(note.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({notes, delete_todo}) => {
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
            {notes.map((note) => <ToDoItem note={note} delete_todo={delete_todo} />)}
        </table>
    )
}

export default ToDoList