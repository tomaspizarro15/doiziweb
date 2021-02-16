import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import noGroupsLogo from './no_groups.png'
import './groups.css'
const Groups = (props) => {

    const [groups, setGroups] = useState([])
    const [user, setUser] = useState({})
    const navigationLinks = [{ id: 0, href: "/join-group", label: "Join Group" }, { id: 1, href: "/new-group", label: "Create Group" }]

    const cookies = new Cookies();
    let groupsList = (
        <ul className="disRL group_list">
            {groups.map(group => {
                return (
                    <li key={group.id} className="dis group_card">
                        <div>

                        </div>
                    </li>
                )
            })}
        </ul>
    )
    useEffect(() => {
        fetch('http://localhost:8080/groups', {
            method: "GET",
            headers: {
                "Authorization": cookies.get('session'),
                "Content-Type": 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    })

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    return (
        <div className="dis main_container">
            {groups.length > 0 ? groupsList :
                <div className="dis group_navigation">
                    <p className="group_navigation__title">It seems that you don't have any groups...</p>
                    <img src={noGroupsLogo} />
                    <div className="disRL group_navigation__buttons">
                        {navigationLinks.map(nav => <Link className="group_navigation__link" to={nav.href}>{nav.label}</Link>)}
                    </div>
                </div>}
        </div>
    )

}

export default Groups; 