import React from 'react';
import './../../groups.css';

const GroupList = (props) => {
    return (
        <div className="groups_list">
            <ul>
                {props.groups.map(group => {
                    return (
                        <li className="group">

                        </li>
                    )
                })}

            </ul>
        </div>
    )
}