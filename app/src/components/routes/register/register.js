import React, { Component } from 'react';
import Title from '../../../util/Titles/titles';
import Fields from './functions/fields';
import './register.css';

class Register extends Component {

    state = {
        fields: [
            { id: 0, type: 'input', label: "Nombre", value: "", placeholder: "Nombre", },
            { id: 1, type: 'input', label: "Apellido", value: "", placeholder: "Apellido", },
            { id: 2, type: 'input', label: "Nombre de usuario", value: "", placeholder: "Nombre de usuario", },
            { id: 3, type: 'input', label: "Email", value: "", placeholder: "Email", },
            { id: 4, type: 'input', label: "Contraseña", value: "", placeholder: "Contraseña", },
            { id: 5, type: 'input', label: "Confirmar Contraseña", value: "", placeholder: "Confirmar", },
            {
                id: 6, type: 'select', label: "Genero", options: [{ id: 0, value: "Hombre", default: "selected" }, { id: 2, value: "Mujer" }, { id: 3, value: "Otro" }, { id: 4, value: "Prefiero no decirlo" }]
            }
        ]
    }

    inputChangeHandler = (event, index) => {
        const fields = [...this.state.fields]
        fields[index].value = event.target.value;
        console.log(event.target.value)
        this.setState({ fields: fields })
    }

    render() {
        return (
            <div className="register_wrapper">
                <div className="register">
                    <div className="register_background">
                        <Title size = "32px" color="#5A7EFF" texto="Registrarse en DOIZI" />
                    </div>
                    <div className="register_data">
                        {this.state.fields.map((field, i) => <Fields change={(event) => { this.inputChangeHandler(event, i) }} key={field.id} field={field} />)}
                    </div>
                </div>
            </div>
        )
    }
}
export default Register; 