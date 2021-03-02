import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as cookies from './../../../factory/cookie'
import noGroupsLogo from './no_groups.png'
import './groups.css'
import NoGroups from './sub-compontents/no-groups/no_groups';
import HeadTitle from '../../../util/head_title/head_title';
import ListWithIcon from '../../../util/Lists/list_with_icon';
const Groups = (props) => {

    const [groups, setGroups] = useState([])
    const [user, setUser] = useState({})
    const [invitations, setInvitations] = useState([])
    const navigationLinks = [{ id: 0, href: "/join-group", label: "Join Group" }, { id: 1, href: "/new-group", label: "Create Group" }]

    useEffect(() => {
        fetch('http://localhost:8080/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.get('session')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setGroups(data.groups)
                    setInvitations(data.invites)
                }
            })
            .catch(err => {
                throw new Error(err)
            })
    }, [])

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    return (
        <div className="dis main_container">
            <NoGroups links={navigationLinks} logo={noGroupsLogo} />
            <div>
                <HeadTitle texto="Invitaciones" />
                <ListWithIcon elements={invitations} />
            </div>
        </div>
    )

}

export default Groups; 