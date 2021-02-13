import React, { Component, Fragment } from 'react';
import Title from '../../../util/Titles/titles';
import Fields from './functions/fields';
import { connect } from 'react-redux';
import * as cookies from '../../../factory/cookie'

import './register.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class Register extends Component {

    state = {
        color: {
            text: "#1B1B1B",
            doizi: "#5A7EFF"
        },
        wrapperStyle: false,
        fields: [
            { key: "name", id: 0, element: 'input', type: "text", label: "Nombre", value: "", placeholder: "Nombre", status: true, errorHelp: "debe tener entre 2 y 32 caracteres" },
            { key: "lastname", id: 1, element: 'input', type: "text", label: "Apellido", value: "", placeholder: "Apellido", status: true, errorHelp: "debe tener entre 2 y 32 caracteres" },
            { key: "username", id: 2, element: 'input', type: "text", label: "Nombre de usuario", value: "", placeholder: "Nombre de usuario", status: true, errorHelp: "debe tener entre 6 y 24 caracteres y estar disponible" },
            { key: "email", id: 3, element: 'input', type: "email", label: "Email", value: "", placeholder: "Email", status: true, errorHelp: "debe ser un email valido" },
            { key: "password", id: 4, element: 'input', type: "password", label: "Contraseña", value: "", placeholder: "Contraseña", status: true, errorHelp: "debe tener minimo 8 caracteres" },
            { key: "confirmation", id: 5, element: 'input', type: "password", label: "Confirmar Contraseña", value: "", placeholder: "Confirmar", status: true, errorHelp: "las contraseñas deben ser iguales" },
            { key: "country", id: 6, element: 'input', type: "country", label: "País", value: "", placeholder: "País", status: true, errorHelp: "Seleccione un país" },
        ],
        URL: 'http://localhost:8080/user/register',
        randomData: "",
        phrase: "<DOIZI/>",
        daftpunkCameo: "Harder Better Faster Stronger",
        error: [],
    }
    inputChangeHandler = (event, index) => {
        const fields = [...this.state.fields]
        fields[index].value = event.target.value;
        this.setState({ fields: fields })
    }
    submitRegisterHandler = () => {
        const fields = [...this.state.fields]
        fields.map(field => {
            field.status = true;
        })
        this.setState({ fields: fields })
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
                country: fields[6].value,
            })
        })
            .then((res) => res.json())
            .then(data => {
                const newFields = [...this.state.fields]
                console.log("ERRORES:>", data.errors)
                const errorArray = []
                if (data.status === 201) {
                    const cookie = new Cookies();
                    cookie.set('session', data.token)
                    window.location.reload()

                } else {
                    data.errors.reduce((acc, val, i, arr) => {
                        if (acc.param !== val.param) {
                            errorArray.push(val);
                            acc = arr[i];
                        } else acc;
                        return acc;
                    }, [])
                }
                console.log(errorArray)
                errorArray.map((err, i) => {
                    newFields.map((field) => {
                        err.param === field.key ? field.status = false : null
                    })
                })
                this.setState({ fields: newFields })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        console.log(this.state.fields)
        let phrase = this.state.phrase.split('')
        let daftpunkCameo = this.state.daftpunkCameo.split(' ')
        let styles = {
            wrapper: "register_wrapper",
            background: "register_background",
            data: "register_data",
            input: "register_input",
        }
        return (
            <div className="register_container">
                <div className={styles.wrapper}>
                    <form className="register">
                        <div className={styles.background}>
                            <Title size="32px" color={this.state.color.text} texto="Registrarse en" /><div style={{ margin: "0 5px 0 0" }}></div><Title size="34px" color={this.state.color.doizi} texto="DOIZI" />
                        </div>
                        <div className={styles.data}>
                            {this.state.fields.map((field, i) => {
                                return (
                                    <div className="disR register_data__field">
                                        <Fields styling={styles.input} change={(event) => { this.inputChangeHandler(event, i) }} key={field.id} field={field} />
                                        {!field.status ? <div className="tooltip"><span className="tooltiptext">{field.errorHelp}</span></div> : null}
                                    </div>
                                )
                            })}
                            <Link className="register_to__login">al registrarse acepta los terminos de usuario</Link>
                            <button type="button" onClick={this.submitRegisterHandler} className="register_button">Registrarse</button>
                            <Link to="/login" className="register_to__login">iniciar sesión</Link>
                        </div>
                    </form>
                </div>
                <div className="register_side">
                    <div>
                        {phrase.map((el, i) => <p key={i} className="register_side__phrase" style={{ animationDelay: `${(i * 100) + 200}ms` }}>{el}</p>)}
                    </div>
                    <div>
                        {daftpunkCameo.map((el, i) => <p key={el} className="register_side__cameo" style={{ animationDelay: `${(i * 1000) + 500}ms` }}>{el}</p>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default Register; 