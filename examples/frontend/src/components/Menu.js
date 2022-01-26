import React from "react";
import {Link} from "react-router-dom";

const MenuList = ({login, username}) => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Users</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/todo'>TODO</Link>
                    </li>
                    <li>
                        {login}
                    </li>
                </ul>
            </nav>
            {username}
        </div>
    )
}

export default MenuList
