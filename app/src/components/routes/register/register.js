import React, { Component } from 'react';
import Title from '../../../util/Titles/titles';
import Fields from './functions/fields';
import './register.css';

class Register extends Component {

    state = {
        fields: [
            { id: 0, element: 'input', type: "text", label: "Nombre", value: "", placeholder: "Nombre", status: true, errorHelp: "debe tener entre 2 y 32 caracteres" },
            { id: 1, element: 'input', type: "text", label: "Apellido", value: "", placeholder: "Apellido", status: true, errorHelp: "debe tener entre 2 y 32 caracteres" },
            { id: 2, element: 'input', type: "text", label: "Nombre de usuario", value: "", placeholder: "Nombre de usuario", status: true, errorHelp: "debe tener entre 6 y 24 caracteres" },
            { id: 3, element: 'input', type: "email", label: "Email", value: "", placeholder: "Email", status: true, errorHelp: "debe ser un email valido" },
            { id: 4, element: 'input', type: "password", label: "Contraseña", value: "", placeholder: "Contraseña", status: true, errorHelp: "debe ser mayor a 8 caracteres" },
            { id: 5, element: 'input', type: "password", label: "Confirmar Contraseña", value: "", placeholder: "Confirmar", status: true, errorHelp: "las contraseñas deben ser iguales" },
            { id: 5, element: 'input', type: "country", label: "País", value: "", placeholder: "País", status: true, errorHelp: "Seleccione un país" },
        ],
        URL: 'http://localhost:8080/user/register'
    }

    inputChangeHandler = (event, index) => {
        const fields = [...this.state.fields]
        fields[index].value = event.target.value;

        this.setState({ fields: fields })
    }
    submitRegisterHandler = () => {
        const fields = [...this.state.fields]
        fetch(this.state.URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fields[0].value,
                lastname: fields[1].value,
                username: fields[2].value,
                email: fields[3].value,
                password: fields[4].value,
                confirmation: fields[5].value,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className="register_wrapper">
                <div className="register">
                    <div className="register_background">
                        <Title size="32px" color="#5A7EFF" texto="Registrarse en" /><div style={{ margin: "0 5px 0 0" }}></div><Title size="34px" color="#2B2B2B" texto="DOIZI" />
                    </div>
                    <div className="register_data">
                        {this.state.fields.map((field, i) => <Fields change={(event) => { this.inputChangeHandler(event, i) }} key={field.id} field={field} />)}
                        <button onClick={this.submitRegisterHandler} className="register_button">Registrarse</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register; 