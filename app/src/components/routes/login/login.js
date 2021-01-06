import React, { Fragment, useState } from 'react';
import './login.css'
const login = () => {

    const [state, setState] = useState({
        fields: [
            { id: 0, label: 'email', value: '', error: false },
            { id: 1, label: 'contraseña', value: '', error: false },
        ],
        status: false,
    })
    const onChangeHandler = ( event , i) => {
        const newFields = [...state.fields]; 
        newFields[i].value = event.target.value; 
        setState({fields : newFields , status : state.status})
    } 
    console.log(state)
    return (    
        <div className="login_container">
            <div className="login">
                <h1>DOIZI</h1>
                <h1>Iniciar Sesión</h1>
                <form>
                    {state.fields.map((field , i) => <Fragment key={field.id}><label>{field.label}</label><input onChange={(event) => {onChangeHandler(event , i)}} value={field.value} name={field.label}/></Fragment>)}
                </form>
                <button>Iniciar Sesión</button>
            </div>
        </div>
    )
}

export default login; 