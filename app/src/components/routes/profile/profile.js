import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const Profile = (props) => {

    const [state, setState] = useState({
        user: {},
        exist: false,
    })
    const cookie = new Cookies();
    useEffect(() => {
        fetch('http://localhost:8080/users/' + window.location.pathname.replace('/', ''), {
            method: 'GET',
            headers: {
                "Authorization": cookie.get('session'),
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                data.user ? setState({ user: data.user, exist: true }) : setState({ user: {}, exist: false });
            })
    }, [])
    console.log(state)
    return (
        <div className="dis main_container">
            <div></div>
        </div>
    )

}

export default Profile; 