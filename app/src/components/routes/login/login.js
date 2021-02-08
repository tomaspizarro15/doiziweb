import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import './login.css'
const login = () => {

    const [state, setState] = useState({
        fields: [
            { id: 0, label: 'email', value: '', type: 'text' },
            { id: 1, label: 'contraseña', value: '', type: 'password' },
        ],
        status: false,
        error: "",
        url: 'http://localhost:8080/session/log-in'
    })
    const fetchLogin = (url, event) => {
        event.preventDefault();
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            },
            body: JSON.stringify({
                email: state.fields[0].value,
                password: state.fields[1].value,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                const cookie = new Cookies();
                cookie.set('session', data.session);
                window.location.replace('http://localhost:3000')
            } else {
                setState({ status: true, url: state.url, fields: state.fields, error: data.error })
                console.log(data)
            }
        })
        .catch(err => {
            setState({ status: true, url: state.url, fields: state.fields, error: "Paso algo extraño , intentar mas tarde" })
        })
    }
    const onChangeHandler = (event, i) => {
        const newFields = [...state.fields];
        newFields[i].value = event.target.value;
        setState({ fields: newFields, status: state.status, url: state.url, error: state.error })
    }
    let loginError = 'error_msg';
    if (state.status === true) {
        loginError = 'error_msg active'
    }
    const doizi = "<DOIZI/>"
    return (
        <div className="dis login_container">
            <div className="dis login">
                <div className="dis login_info">
                    <h1 className="login_title">{doizi}</h1>
                </div>
                <h1 className="login_h1">Iniciar Sesión</h1>
                <form onSubmit={(event) => { fetchLogin(state.url, event) }} className="dis login_form">
                    {state.fields.map((field, i) => <Fragment key={field.id}><label>{field.label}</label><input type={field.type} onChange={(event) => { onChangeHandler(event, i) }} placeholder={field.label} value={field.value} name={field.label} /></Fragment>)}
                    <p className={loginError} style={{ color: 'red' }} >{state.error}</p>
                    <Link to="/register">no tengo una cuenta en Doizi</Link>
                    <button type="submit" className="login_button">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}

export default login; 